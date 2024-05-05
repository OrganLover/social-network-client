import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@features';

import { Container } from './auth.css';
import LangToggle from 'src/features/lang-toggle/lang-toggle';

const AuthPage = () => {
  return (
    <Container>
      <LangToggle position='top-left' />
      <ThemeToggle position='top-right' />

      <Outlet />
    </Container>
  );
};

export default AuthPage;
