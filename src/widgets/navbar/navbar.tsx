import { Link } from 'react-router-dom';
import { AppShellNavbar, Flex, Stack, Text } from '@mantine/core';
import { IconCard } from '@shared/ui';

import { NAVBAR_TRANSLATION_PREFIX, PATHS } from './navbar.constant';
import { useTranslation } from 'react-i18next';
import { NavbarProps } from './navbar.interface';

const Navbar = ({ closeNavbar }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <AppShellNavbar p={30}>
      <Stack justify='center' align='left' w={'100%'}>
        {PATHS.map(([path, icon]) => {
          const translationKey = path === 'users/me' ? 'me' : path;

          return (
            <div onClick={() => closeNavbar()}>
              <Link
                key={path}
                to={`/${path}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--mantine-color-text)',
                }}
              >
                <Flex key={path} align={'end'}>
                  <IconCard
                    Icon={icon}
                    shadow='lg'
                    containerStyles={{ marginRight: 10 }}
                  />
                  <Text size='20px' w={'100%'}>
                    {t(`${NAVBAR_TRANSLATION_PREFIX}.${translationKey}`)}
                  </Text>
                </Flex>
              </Link>
            </div>
          );
        })}
      </Stack>
    </AppShellNavbar>
  );
};

export default Navbar;
