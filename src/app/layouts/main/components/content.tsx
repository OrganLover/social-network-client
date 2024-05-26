import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header, Navbar } from '@widgets';
import { Outlet } from 'react-router-dom';

const MainLayoutContent = () => {
  const [opened, { toggle, close }] = useDisclosure();

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

export default MainLayoutContent;
