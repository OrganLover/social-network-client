import { useLocation, useParams } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { User } from '@widgets';
import { UserStoreProvider, useMainStore } from '@shared/providers';
import { ProfileEditor } from '@features';

import UserPosts from './components/posts/posts';

const UserPage = () => {
  const { owner } = useMainStore();
  const { userId } = useParams();
  const { pathname } = useLocation();

  const id = userId ? Number.parseInt(userId) : owner.id!;
  const pn = pathname.split('/');
  const isOwner = owner.id === id || pn[pn.length - 1] === 'me';

  owner.setProperties({ isOwner });

  return (
    <UserStoreProvider id={id}>
      <Stack p={20} w={'100%'} h={'100%'} pos={'relative'}>
        <User.Profile />
        {isOwner ? <ProfileEditor /> : null}
        <UserPosts />
      </Stack>
    </UserStoreProvider>
  );
};

export default UserPage;
