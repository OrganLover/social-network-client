import { useMemo } from 'react';

import AppContent from './components/app-content/app-content';
import { StoreProvider } from './providers';
import { createMainStoreContextValue } from './providers/store/context';
import I18nProvider from './providers/i18n/provider';

const App = () => {
	const mainStore = useMemo(() => {
		return createMainStoreContextValue();
	}, []);

	return (
		<StoreProvider value={mainStore}>
			<I18nProvider>
				<AppContent />
			</I18nProvider>
		</StoreProvider>
	);
};

export default App;
