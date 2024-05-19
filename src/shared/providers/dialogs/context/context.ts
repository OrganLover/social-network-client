import { createContext } from 'react';

import DialogsStore from '../store/store';

export const createDialogsStoreContextValue = (userId: number) => {
  return new DialogsStore(userId);
};

const DialogsStoreContext = createContext(createDialogsStoreContextValue(0));

export default DialogsStoreContext;
