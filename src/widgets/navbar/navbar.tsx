import { Link } from 'react-router-dom';
import { AppShellNavbar, Stack } from '@mantine/core';
import { IconCard } from '@shared/ui';

import { PATHS } from './navbar.constant';

const Navbar = () => {
  return (
    <AppShellNavbar>
      <Stack>
        {PATHS.map(([path, icon]) => {
          return (
            <div key={path}>
              <IconCard Icon={icon} />
              <Link to={`/${path}`}>{path}</Link>
            </div>
          );
        })}
      </Stack>
    </AppShellNavbar>
  );
};

export default Navbar;
