import type { ReactNode } from 'react';

import StoreProvider from './store/provider';
import MantineProvider from './mantine/provider';
import I18nProvider from './i18n/provider';

import type { MainStore } from './store/context';

type Props = {
	children: ReactNode;
	mainStore: MainStore;
};

const Providers = ({ children, mainStore }: Props) => {
	return (
		<StoreProvider value={mainStore}>
			<I18nProvider>
				<MantineProvider>{children}</MantineProvider>
			</I18nProvider>
		</StoreProvider>
	);
};

export default Providers;
