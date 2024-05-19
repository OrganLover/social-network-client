import { useContext } from 'react';

import DialogsStoreContext from '../context/context';

const useDialogsStore = () => {
  return useContext(DialogsStoreContext);
};

export default useDialogsStore;
