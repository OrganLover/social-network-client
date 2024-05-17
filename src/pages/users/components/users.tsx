import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, SimpleGrid } from '@mantine/core';
import { useUsersStore } from '@shared/providers';
import { UserCard } from '@entities';

const Users = () => {
  const store = useUsersStore();

  useEffect(() => {
    store.setupUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex justify={'center'} w={'100%'}>
      <SimpleGrid cols={{ xl: 5, lg: 4, md: 3, xs: 2 }}>
        {store.users.map(({ id }) => {
          return <UserCard id={id} />;
        })}
      </SimpleGrid>
    </Flex>
  );
};

export default observer(Users);
