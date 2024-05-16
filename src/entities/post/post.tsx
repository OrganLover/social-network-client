import { useMemo } from 'react';
import {
  Avatar,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useUserStore } from '@shared/providers';

import type { PostProps } from './post.interface';

const Post = ({ id, features }: PostProps) => {
  const { posts, avatarUrl } = useUserStore();

  const currentPost = useMemo(() => {
    return posts.find(post => post.id === id);
  }, [id, posts]);

  const date = useMemo(() => {
    if (!currentPost) {
      return null;
    }

    const d = new Date(currentPost.createdAt);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }, [currentPost]);

  const avatarSymbols = useMemo(() => {
    if (!currentPost) {
      return;
    }

    return currentPost.author.profile.userName
      ?.split(' ')
      .map(part => part[0])
      .join('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost?.author.profile.userName]);

  if (!currentPost) {
    return null;
  }

  return (
    <Paper shadow='lg' p={10} w={'100%'} mb={20}>
      <Stack>
        <Flex>
          <Stack justify={'center'}>
            <Avatar size={'xl'} src={avatarUrl} color={'cyan'}>
              {avatarSymbols}
            </Avatar>
          </Stack>

          <Stack justify={'start'} p={10} flex={1} gap={0}>
            <Text>{currentPost.author.profile.userName}</Text>
            <Text c={'gray'}>{date}</Text>
            <Divider />
          </Stack>

          {features.actions}
        </Flex>

        <Stack pl={10}>
          <Title order={2}>{currentPost.title}</Title>
          <Text>{currentPost.content}</Text>
          <Group>{features.rating}</Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Post;
