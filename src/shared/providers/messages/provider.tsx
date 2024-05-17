import { useMemo, type ReactNode } from 'react';

import MessagesStoreContext, {
  createMessagesStoreContextValue,
} from './context/context';

type Props = {
  children: ReactNode;
};

const MessagesStoreProvider = ({ children }: Props) => {
  const store = useMemo(() => createMessagesStoreContextValue(), []);

  return (
    <MessagesStoreContext.Provider value={store}>
      {children}
    </MessagesStoreContext.Provider>
  );
};

export default MessagesStoreProvider;
