import { Group, Popover, Text } from '@mantine/core';
import { IconCard } from '@shared/ui';
import { observer } from 'mobx-react-lite';
import { PiPencilSimpleLine, PiTrashLight } from 'react-icons/pi';
import { PostActionsProps } from './post-actions.interface';
import { useUserStore } from '@shared/providers';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { POSTS_TRANSLATION_PREFIX } from './post-actions.constant';

const PostActions = ({ id }: PostActionsProps) => {
  const [isOpened, setOpenedState] = useState(false);

  const store = useUserStore();
  const { t } = useTranslation();
  const { posts } = store;

  const currentPost = useMemo(() => {
    return posts.find(post => post.id === id);
  }, [id, posts]);

  if (!currentPost) {
    return null;
  }

  return (
    <Group>
      <IconCard
        Icon={PiPencilSimpleLine}
        onClick={() =>
          store.setProperties({
            modalMode: 'update',
            selectedPost: currentPost,
          })
        }
      />

      <Popover opened={isOpened} onClose={() => setOpenedState(false)}>
        <Popover.Target>
          <IconCard
            Icon={PiTrashLight}
            onClick={() => setOpenedState(prev => !prev)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Text
            onClick={() => store.deletePost(currentPost.id)}
            style={{ cursor: 'pointer' }}
            c={'red'}
          >
            {t(`${POSTS_TRANSLATION_PREFIX}.confirm`)}
          </Text>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default observer(PostActions);
