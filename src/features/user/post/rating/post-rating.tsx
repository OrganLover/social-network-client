import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Pill, PillGroup, Text } from '@mantine/core';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

import type { PostRatingProps } from './post-rating.interface';
import { useMainStore, useUserStore } from '@shared/providers';

const PostRating = ({ id }: PostRatingProps) => {
  const { owner } = useMainStore();
  const store = useUserStore();

  const currentPost = useMemo(() => {
    return store.posts.find(post => post.id === id);
  }, [id, store.posts]);

  const isLiked = useMemo(() => {
    if (!currentPost) {
      return false;
    }

    return currentPost.likedBy.some(({ userId }) => userId === owner.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost]);

  const isDisliked = useMemo(() => {
    if (!currentPost) {
      return false;
    }

    return currentPost.dislikedBy.some(({ userId }) => userId === owner.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost]);

  if (!currentPost) {
    return null;
  }

  const { likesCount, dislikesCount } = currentPost;

  return (
    <PillGroup>
      <Pill
        h={30}
        bg={isLiked ? 'dark' : undefined}
        onClick={() =>
          store.ratePost({ value: 1, postId: id, userId: owner.id! })
        }
      >
        <Flex h={'100%'} justify={'center'} align={'center'}>
          <BiSolidLike size={20} color={isLiked ? 'white' : undefined} />

          {likesCount ? (
            <Text size={'lg'} mt={5} ml={5} c={isLiked ? 'white' : undefined}>
              {likesCount}
            </Text>
          ) : null}
        </Flex>
      </Pill>
      <Pill
        h={30}
        bg={isDisliked ? 'dark' : undefined}
        onClick={() =>
          store.ratePost({ value: -1, postId: id, userId: owner.id! })
        }
      >
        <Flex h={'100%'} w={'100%'} justify={'center'} align={'center'}>
          {dislikesCount ? (
            <Text
              size={'lg'}
              mt={5}
              mr={5}
              c={isDisliked ? 'white' : undefined}
            >
              {dislikesCount}
            </Text>
          ) : null}

          <BiSolidDislike size={20} color={isDisliked ? 'white' : undefined} />
        </Flex>
      </Pill>
    </PillGroup>
  );
};

export default observer(PostRating);
