import { createContext } from 'react';

import MessagesStore from '../store/store';

export const createMessagesStoreContextValue = () => {
  return new MessagesStore();
};

const MessagesStoreContext = createContext(createMessagesStoreContextValue());

export default MessagesStoreContext;
