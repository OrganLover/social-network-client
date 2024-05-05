import { createContext } from 'react';

import UserStore from './user/store';

export type MainStore = {
  user: UserStore;
};

export const createMainStoreContextValue = (): MainStore => {
  return {
    user: new UserStore(),
  };
};

const MainStoreContext = createContext(createMainStoreContextValue());

export default MainStoreContext;
