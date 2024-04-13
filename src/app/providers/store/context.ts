import { createContext } from 'react';

import UserStore from './user/store';

export type MainStoreContextValue = {
	user: UserStore;
};

export const createMainStoreContextValue = (): MainStoreContextValue => {
	return {
		user: new UserStore(),
	};
};

const MainStoreContext = createContext(createMainStoreContextValue());

export default MainStoreContext;
