import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useMainStore } from '@shared/providers';

import Layout from 'src/app/layouts/layout';
import { LAYOUT } from 'src/app/layouts/layout.constant';

import type { LayoutType } from 'src/app/layouts/layout.interface';

const AppContent = observer(() => {
  const { owner } = useMainStore();

  const [layout, setLayout] = useState<LayoutType>(null);

  useEffect(() => {
    const userify = async () => {
      await owner.authorize();
    };

    userify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (owner.isAuth === null) {
      return;
    }

    if (owner.isAuth) {
      setLayout(LAYOUT.MAIN);
      return;
    }

    setLayout(LAYOUT.AUTH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner.isAuth]);

  return <Layout layoutType={layout} />;
});

export default AppContent;
