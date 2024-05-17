import { useContext } from 'react';

import MessagesStoreContext from '../context/context';

const useMessagesStore = () => {
  return useContext(MessagesStoreContext);
};

export default useMessagesStore;
