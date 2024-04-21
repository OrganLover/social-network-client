import { useMantineColorScheme } from '@mantine/core';
import IconCard from '@shared/ui/icon-card/icon-card';
import { useMemo } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi';
import { ThemeToggleProps } from './theme-toggle.interface';

const ThemeToggle = ({ position }: ThemeToggleProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const Icon = useMemo(() => {
		if (colorScheme === 'light') {
			return PiMoon;
		}

		return PiSun;
	}, [colorScheme]);

	return (
		<IconCard
			Icon={Icon}
			onClick={toggleColorScheme}
			position={position}
			shadow='xl'
		/>
	);
};

export default ThemeToggle;
