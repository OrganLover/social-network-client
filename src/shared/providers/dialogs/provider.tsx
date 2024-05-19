import { useMemo, type ReactNode } from 'react';

import DialogsStoreContext, {
  createDialogsStoreContextValue,
} from './context/context';

type Props = {
  userId: number;
  children: ReactNode;
};

const DialogsStoreProvider = ({ userId, children }: Props) => {
  const store = useMemo(() => createDialogsStoreContextValue(userId), [userId]);

  return (
    <DialogsStoreContext.Provider value={store}>
      {children}
    </DialogsStoreContext.Provider>
  );
};

export default DialogsStoreProvider;
