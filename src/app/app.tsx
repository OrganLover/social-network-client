import { useMemo } from 'react';

import AppContent from './components/app-content/app-content';
import { StoreProvider } from './providers';
import { createMainStoreContextValue } from './providers/store/context';

const App = () => {
	const mainStore = useMemo(() => {
		return createMainStoreContextValue();
	}, []);

	return (
		<StoreProvider value={mainStore}>
			<AppContent />
		</StoreProvider>
	);
};

export default App;
