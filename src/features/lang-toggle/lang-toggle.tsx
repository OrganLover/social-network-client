import { useTranslation } from 'react-i18next';
import { PiGlobe } from 'react-icons/pi';
import { Tooltip } from '@mantine/core';

import { IconCard } from '@shared/ui';

import type { LangToggleProps } from './lang-toggle.interface';

const LangToggle = ({ position }: LangToggleProps) => {
	const { t, i18n } = useTranslation();

	const toggleLang = () => {
		const lang = i18n.language === 'ru' ? 'en' : 'ru';

		i18n.changeLanguage(lang);
	};

	return (
		<Tooltip label={t('common:lang-toggle.tooltip-content')}>
			<IconCard
				Icon={PiGlobe}
				onClick={toggleLang}
				position={position}
				shadow='xl'
			/>
		</Tooltip>
	);
};

export default LangToggle;
