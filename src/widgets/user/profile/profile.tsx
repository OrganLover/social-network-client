import { useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Avatar,
  Divider,
  Flex,
  Grid,
  Indicator,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useUserStore } from '@shared/providers';

const UserProfile = () => {
  const user = useUserStore();
  const { name, aboutMe, avatarUrl, isLoading } = user;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    user.setupProfile();
    user.setupPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const avatarSymbols = useMemo(() => {
    return name
      ?.split(' ')
      .map(part => part[0])
      .join('');
  }, [name]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Flex justify={'left'} align={'center'}>
          <Indicator size={15}>
            <Avatar
              w={300}
              h={300}
              radius={'md'}
              src={avatarUrl}
              size={200}
              color='cyan'
              onClick={() => inputRef.current?.click()}
            >
              {avatarSymbols}
            </Avatar>
            <input
              type='file'
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={e =>
                e.target.files?.[0]
                  ? user.saveAvatar(e.target.files[0])
                  : undefined
              }
            />
          </Indicator>
        </Flex>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack>
          <Stack>
            <Title>{name}</Title>
          </Stack>
          <Divider />
          <Text>{aboutMe}</Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default observer(UserProfile);
