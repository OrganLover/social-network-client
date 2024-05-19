import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { DialogsPage, UserPage, UsersPage } from '@pages';

import MainLayoutContent from './components/content';

const MainLayout = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayoutContent />,
      children: [
        {
          path: '/dialogs',
          element: <DialogsPage />,
        },
        {
          path: '/users',
          element: <UsersPage />,
        },
        {
          path: '/users/me',
          element: <UserPage />,
        },
        {
          path: 'users/:userId',
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
