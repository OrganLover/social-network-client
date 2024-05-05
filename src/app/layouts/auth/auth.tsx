import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AuthPage } from '@pages';
import { LoginBlock, RegistrationBlock } from '@widgets';

const AuthLayout = () => {
  const router = createBrowserRouter([
    {
      element: <AuthPage />,
      children: [
        {
          path: '/',
          element: <LoginBlock />,
        },
        {
          path: '/login',
          element: <LoginBlock />,
        },
        {
          path: '/registration',
          element: <RegistrationBlock />,
        },
        {
          path: '*',
          element: <Navigate to={'/'} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AuthLayout;
