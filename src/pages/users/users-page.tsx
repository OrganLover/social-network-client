import { Flex } from '@mantine/core';
import { UsersStoreProvider } from '@shared/providers';

import Users from './components/users';

const UsersPage = () => {
  return (
    <UsersStoreProvider>
      <Flex p={20}>
        <Users />
      </Flex>
    </UsersStoreProvider>
  );
};

export default UsersPage;
