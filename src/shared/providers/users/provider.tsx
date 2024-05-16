import { useMemo, type ReactNode } from 'react';

import UsersStoreContext, {
  createUsersStoreContextValue,
} from './context/context';

type Props = {
  children: ReactNode;
};

const UsersStoreProvider = ({ children }: Props) => {
  const store = useMemo(() => createUsersStoreContextValue(), []);

  return (
    <UsersStoreContext.Provider value={store}>
      {children}
    </UsersStoreContext.Provider>
  );
};

export default UsersStoreProvider;
