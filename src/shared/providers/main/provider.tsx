import type { ReactNode } from 'react';

import MainStoreContext, { MainStore } from './context/context';

type Props = {
  children: ReactNode;
  value: MainStore;
};

const MainStoreProvider = ({ children, value }: Props) => {
  return (
    <MainStoreContext.Provider value={value}>
      {children}
    </MainStoreContext.Provider>
  );
};

export default MainStoreProvider;
