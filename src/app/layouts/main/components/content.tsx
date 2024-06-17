import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDialogsStore, useMainStore } from '@shared/providers';
import { Header, Navbar } from '@widgets';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayoutContent = () => {
  const [opened, { toggle, close }] = useDisclosure();

  const { owner } = useMainStore();
  const dialogsStore = useDialogsStore();

  useEffect(() => {
    const setupDialogs = async () => {
      await dialogsStore.setupDialogs();
    };

    if (owner.id) {
      setupDialogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner.id]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      h={'100%'}
      w={'100%'}
    >
      <Header isNavbarOpened={opened} toggleNavbar={toggle} />

      <Navbar closeNavbar={close} />

      <AppShell.Main h={'100%'} w={'100%'}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default observer(MainLayoutContent);
