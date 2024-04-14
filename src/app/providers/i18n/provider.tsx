import { useEffect, useMemo, useState } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { LOCAL_STORAGE } from '@shared/local-storage/local-storage.constant';

import { LANGUAGE, SEGMENT } from './provider.constant';

import type { I18nProviderProps } from './provider.interface';

const I18nProvider = ({ children }: I18nProviderProps) => {
	const [isI18nReady, setI18nReadyState] = useState(false);

	const i18nextInstance = useMemo(() => {
		return i18next
			.createInstance()
			.use(i18nextBrowserLanguageDetector)
			.use(initReactI18next);
	}, []);

	useEffect(() => {
		const addResource = (lng: string, ns: string, resources: any) => {
			i18nextInstance.addResourceBundle(lng, ns, resources, true, true);
		};

		const initI18n = async () => {
			await i18nextInstance.init({
				supportedLngs: [LANGUAGE.RU, LANGUAGE.EN],
				fallbackLng: LANGUAGE.EN,
				ns: [SEGMENT.PAGES],
				detection: {
					order: ['queryString', 'localStorage', 'navigator'],
					lookupLocalStorage: LOCAL_STORAGE.LANGUAGE,
				},
				react: {
					useSuspense: false,
				},
			});

			const { pages: ruLocale } = await import('../../locales/ru');
			const { pages: enLocale } = await import('../../locales/en');

			addResource(LANGUAGE.RU, SEGMENT.PAGES, ruLocale);
			addResource(LANGUAGE.EN, SEGMENT.PAGES, enLocale);

			setI18nReadyState(true);
		};

		initI18n();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isI18nReady) {
		return null;
	}

	return <I18nextProvider i18n={i18nextInstance}>{children}</I18nextProvider>;
};

export default I18nProvider;
