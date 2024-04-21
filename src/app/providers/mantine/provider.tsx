import { MantineProvider as Provider, createTheme } from '@mantine/core';

import type { MantineProviderProps } from './provider.interface';

const MantineProvider = ({ children }: MantineProviderProps) => {
	const theme = createTheme({});

	return (
		<Provider theme={theme} defaultColorScheme='auto'>
			{children}
		</Provider>
	);
};

export default MantineProvider;
