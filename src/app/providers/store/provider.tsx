import type { ReactNode } from 'react';

import MainStoreContext, { MainStore } from './context';

type Props = {
	children: ReactNode;
	value: MainStore;
};

const StoreProvider = ({ children, value }: Props) => {
	return (
		<MainStoreContext.Provider value={value}>
			{children}
		</MainStoreContext.Provider>
	);
};

export default StoreProvider;
