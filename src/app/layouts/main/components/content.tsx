import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header, Navbar } from '@widgets';
import { Outlet } from 'react-router-dom';

const MainLayoutContent = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <Header isNavbarOpened={opened} toggleNavbar={toggle} />

      <Navbar />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayoutContent;
