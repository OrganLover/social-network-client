import { useMemo } from 'react';

import AppContent from './components/app-content/app-content';
import { createMainStoreContextValue } from '../shared/providers/main/context/context';
import Providers from './providers';

const App = () => {
  const mainStore = useMemo(() => {
    return createMainStoreContextValue();
  }, []);

  return (
    <Providers mainStore={mainStore}>
      <AppContent />
    </Providers>
  );
};

export default App;
