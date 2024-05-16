import { useContext } from 'react';

import MainStoreContext from '../context/context';

const useMainStore = () => {
  return useContext(MainStoreContext);
};

export default useMainStore;
