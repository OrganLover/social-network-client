import type { ReactNode } from 'react';

import MainStoreContext, { MainStoreContextValue } from './context';

type Props = {
	children: ReactNode;
	value: MainStoreContextValue;
};

const StoreProvider = ({ children, value }: Props) => {
	return (
		<MainStoreContext.Provider value={value}>
			{children}
		</MainStoreContext.Provider>
	);
};

export default StoreProvider;
