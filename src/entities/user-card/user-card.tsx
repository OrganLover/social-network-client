import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Avatar, Flex, Indicator, Paper, Stack, Text } from '@mantine/core';
import { useUsersStore } from '@shared/providers';

import type { UserCardProps } from './user-card.interface';

const UserCard = ({ id }: UserCardProps) => {
  const { users } = useUsersStore();
  const navigate = useNavigate();

  const currentUser = useMemo(() => {
    return users.find(user => user.id === id);
  }, [id, users]);

  const avatarSymbols = useMemo(() => {
    return currentUser?.profile.userName
      ?.split(' ')
      .map(part => part[0])
      .join('');
  }, [currentUser?.profile.userName]);

  const avatarUrl = useMemo(() => {
    if (!currentUser) {
      return;
    }

    return `${import.meta.env._URL_TO_AVATARS}/${
      currentUser.profile.avatarPath
    }`;
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <Paper
      shadow='xl'
      p={10}
      radius={10}
      onClick={() => navigate(`/users/${currentUser.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Stack gap={5}>
        <Flex justify={'left'} align={'center'}>
          <Indicator size={10}>
            <Avatar
              w={200}
              h={200}
              radius={'md'}
              src={avatarUrl}
              size={200}
              color='cyan'
            >
              {avatarSymbols}
            </Avatar>
          </Indicator>
        </Flex>
        <Stack>
          <Text size={'xl'}>{currentUser.profile.userName}</Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default observer(UserCard);
