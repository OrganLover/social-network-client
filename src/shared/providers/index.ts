import MainStoreProvider from './main/provider';
import useMainStore from './main/hooks/use-main-store';

import UserStoreProvider from './user/provider';
import useUserStore from './user/hooks/use-user-store';

import UsersStoreProvider from './users/provider';
import useUsersStore from './users/hooks/use-users-store';

import DialogsStoreProvider from './dialogs/provider';
import useDialogsStore from './dialogs/hooks/use-users-store';

export {
  MainStoreProvider,
  useMainStore,
  UserStoreProvider,
  useUserStore,
  UsersStoreProvider,
  useUsersStore,
  DialogsStoreProvider,
  useDialogsStore,
};
