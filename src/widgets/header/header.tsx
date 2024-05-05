import { AppShellHeader, Burger, Button, Flex } from '@mantine/core';
import { HeaderProps } from './header.interface';
import useMainStore from '@shared/hooks/use-main-store';

const Header = ({ isNavbarOpened, toggleNavbar }: HeaderProps) => {
  const { user } = useMainStore();

  return (
    <AppShellHeader>
      <Flex justify='space-between' align={'center'} h={'100%'} p={10}>
        <div>
          <Burger
            opened={isNavbarOpened}
            onClick={toggleNavbar}
            hiddenFrom='sm'
            size='sm'
          />
        </div>
        <Button onClick={() => user.logout()}>Выйти</Button>
      </Flex>
    </AppShellHeader>
  );
};

export default Header;
