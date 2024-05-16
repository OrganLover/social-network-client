import { useContext } from 'react';

import UserStoreContext from '../context/context';

const useUserStore = () => {
  return useContext(UserStoreContext);
};

export default useUserStore;
