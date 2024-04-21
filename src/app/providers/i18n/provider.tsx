import { useEffect, useMemo, useState } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { LOCAL_STORAGE } from '@shared/local-storage/local-storage.constant';

import { LANGUAGE, SEGMENT } from './provider.constant';

import type { I18nProviderProps, Segment } from './provider.interface';

const I18nProvider = ({ children }: I18nProviderProps) => {
	const [isI18nReady, setI18nReadyState] = useState(false);

	const i18nextInstance = useMemo(() => {
		return i18next
			.createInstance()
			.use(i18nextBrowserLanguageDetector)
			.use(initReactI18next);
	}, []);

	useEffect(() => {
		const addResources = (lng: string, resources: [Segment, any][]) => {
			for (const resource of resources) {
				const [namespace, payload] = resource;
				i18nextInstance.addResourceBundle(lng, namespace, payload, true, true);
			}
		};

		const initI18n = async () => {
			await i18nextInstance.init({
				supportedLngs: [LANGUAGE.RU, LANGUAGE.EN],
				fallbackLng: LANGUAGE.EN,
				ns: [SEGMENT.PAGES, SEGMENT.ERRORS],
				detection: {
					order: ['queryString', 'localStorage', 'navigator'],
					lookupLocalStorage: LOCAL_STORAGE.LANGUAGE,
				},
				react: {
					useSuspense: false,
				},
			});

			const { pages: ruPages, errors: ruErrors } = await import(
				'../../locales/ru'
			);
			const { pages: enPages, errors: enErrors } = await import(
				'../../locales/en'
			);

			addResources(LANGUAGE.RU, [
				[SEGMENT.PAGES, ruPages],
				[SEGMENT.ERRORS, ruErrors],
			]);
			addResources(LANGUAGE.EN, [
				[SEGMENT.PAGES, enPages],
				[SEGMENT.ERRORS, enErrors],
			]);

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
