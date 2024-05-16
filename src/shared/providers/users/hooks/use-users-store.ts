import { useContext } from 'react';

import UsersStoreContext from '../context/context';

const useUsersStore = () => {
  return useContext(UsersStoreContext);
};

export default useUsersStore;
