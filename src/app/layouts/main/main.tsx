import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { DialogsStoreProvider, useMainStore } from '@shared/providers';
import { DialogsPage, UserPage, UsersPage } from '@pages';

import MainLayoutContent from './components/content';

const MainLayout = () => {
  const { owner } = useMainStore();

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

  return (
    <DialogsStoreProvider userId={owner.id!}>
      <RouterProvider router={router} />
    </DialogsStoreProvider>
  );
};

export default MainLayout;
