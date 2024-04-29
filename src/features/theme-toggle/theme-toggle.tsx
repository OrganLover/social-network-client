import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, useMantineColorScheme } from '@mantine/core';
import { PiMoon, PiSun } from 'react-icons/pi';

import IconCard from '@shared/ui/icon-card/icon-card';

import type { ThemeToggleProps } from './theme-toggle.interface';

const ThemeToggle = ({ position }: ThemeToggleProps) => {
	const { t } = useTranslation();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const Icon = useMemo(() => {
		if (colorScheme === 'light') {
			return PiMoon;
		}

		return PiSun;
	}, [colorScheme]);

	return (
		<Tooltip label={t('common:theme-toggle.tooltip-content')}>
			<IconCard
				Icon={Icon}
				onClick={toggleColorScheme}
				position={position}
				shadow='xl'
			/>
		</Tooltip>
	);
};

export default ThemeToggle;
