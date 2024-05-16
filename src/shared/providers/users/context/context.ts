import { createContext } from 'react';

import UsersStore from '../store/store';

export const createUsersStoreContextValue = () => {
  return new UsersStore();
};

const UsersStoreContext = createContext(createUsersStoreContextValue());

export default UsersStoreContext;
