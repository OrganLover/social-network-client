import { createContext } from 'react';

import UserStore from '../store/store';

export const createUserStoreContextValue = (id: number) => {
  return new UserStore(id);
};

const UserStoreContext = createContext(createUserStoreContextValue(0));

export default UserStoreContext;
