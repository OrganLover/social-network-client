import type { ReactNode } from 'react';

import MainStoreProvider from '../../shared/providers/main/provider';
import MantineProvider from './mantine/provider';
import I18nProvider from './i18n/provider';

import type { MainStore } from '../../shared/providers/main/context/context';

type Props = {
  children: ReactNode;
  mainStore: MainStore;
};

const Providers = ({ children, mainStore }: Props) => {
  return (
    <MainStoreProvider value={mainStore}>
      <I18nProvider>
        <MantineProvider>{children}</MantineProvider>
      </I18nProvider>
    </MainStoreProvider>
  );
};

export default Providers;
