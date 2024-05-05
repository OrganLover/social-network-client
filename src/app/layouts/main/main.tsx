import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { UserPage } from '@pages';

import MainLayoutContent from './components/content';

const MainLayout = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayoutContent />,
      children: [
        {
          path: '/',
          element: <UserPage />,
        },
        {
          path: '/profile',
          element: <UserPage />,
        },
        {
          path: '/dialogs',
          element: <UserPage />,
        },
        {
          path: '/users',
          element: <UserPage />,
        },
        {
          path: '/settings',
          element: <UserPage />,
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

export default MainLayout;
