import { AppShellHeader, Burger, Button, Flex, Group } from '@mantine/core';
import { useMainStore } from '@shared/providers';

import type { HeaderProps } from './header.interface';
import { useTranslation } from 'react-i18next';
import { HEADER_TRANSLATION_PREFIX } from './header.constant';
import { LangToggle, ThemeToggle } from '@features';

const Header = ({ isNavbarOpened, toggleNavbar }: HeaderProps) => {
  const { owner: user } = useMainStore();
  const { t } = useTranslation();

  return (
    <AppShellHeader>
      <Flex justify='space-between' align={'center'} h={'100%'} p={10}>
        <Group>
          <Burger
            opened={isNavbarOpened}
            onClick={toggleNavbar}
            hiddenFrom='sm'
            size='sm'
          />
          <LangToggle />
          <ThemeToggle />
        </Group>
        <Button onClick={() => user.logout()}>
          {t(`${HEADER_TRANSLATION_PREFIX}.logout`)}
        </Button>
      </Flex>
    </AppShellHeader>
  );
};

export default Header;
