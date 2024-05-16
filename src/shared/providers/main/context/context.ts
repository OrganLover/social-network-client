import { createContext } from 'react';

import OwnerStore from '../store/store';

export type MainStore = {
  owner: OwnerStore;
};

export const createMainStoreContextValue = (): MainStore => {
  return {
    owner: new OwnerStore(),
  };
};

const MainStoreContext = createContext(createMainStoreContextValue());

export default MainStoreContext;
