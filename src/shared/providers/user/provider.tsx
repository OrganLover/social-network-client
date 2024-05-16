import { useMemo, type ReactNode } from 'react';

import UserStoreContext, {
  createUserStoreContextValue,
} from './context/context';

type Props = {
  id: number;
  children: ReactNode;
};

const UserStoreProvider = ({ id, children }: Props) => {
  const store = useMemo(() => createUserStoreContextValue(id), [id]);

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreProvider;
