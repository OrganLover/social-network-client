import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Modal, Stack, Textarea, Tooltip } from '@mantine/core';
import { useMainStore, useUserStore } from '@shared/providers';
import { User } from '@widgets';
import { IconCard, Input } from '@shared/ui';
import { PiPlusCircleBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import { POSTS_TRANSLATION_PREFIX } from './posts.constant';
import { Form, useForm } from '@mantine/form';

const UserPosts = () => {
  const { owner } = useMainStore();
  const store = useUserStore();
  const { sortedPosts, selectedPost, modalMode } = store;
  const { t: translate } = useTranslation();

  const t = (key: string) =>
    translate(`${POSTS_TRANSLATION_PREFIX}.post-creator.${key}`);

  const ValidationError = useMemo(
    () => ({
      title: 'title error',
      content: 'content error',
    }),
    [],
  );

  const form = useForm({
    clearInputErrorOnChange: true,
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      content: '',
    },
    validate: {
      title: v => (!v.length ? ValidationError.title : null),
      content: v => (v.length > 255 ? ValidationError.content : null),
    },
  });

  useEffect(() => {
    if (modalMode === 'update') {
      form.setValues({
        title: selectedPost?.title,
        content: selectedPost?.content,
      });
    }
  }, [modalMode]);

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      switch (modalMode) {
        case 'create': {
          store.createPost({ ...form.getValues(), authorId: owner.id! });
          break;
        }

        case 'update': {
          store.updatePost({
            ...form.getValues(),
            id: selectedPost!.id,
          });
          break;
        }
      }

      store.setProperties({ modalMode: undefined });
      form.reset();
    }
  };

  return (
    <Stack pos='relative'>
      {owner.isOwner ? (
        <Flex justify={'right'}>
          <Tooltip label={t('tooltip')}>
            <IconCard
              shadow='xl'
              Icon={PiPlusCircleBold}
              onClick={() => store.setProperties({ modalMode: 'create' })}
            />
          </Tooltip>
        </Flex>
      ) : null}

      <Modal
        opened={!!modalMode}
        onClose={() => {
          store.setProperties({ modalMode: undefined });
          form.reset();
        }}
      >
        <Form form={form}>
          <Stack justify={'center'}>
            <Input
              description={t('post-title')}
              {...form.getInputProps('title')}
            />
            <Textarea
              description={t('post-content')}
              mt={5}
              mb={5}
              size='xl'
              {...form.getInputProps('content')}
            />
            <Button onClick={handleSubmit}>{t('submit-text')}</Button>
          </Stack>
        </Form>
      </Modal>

      {sortedPosts.map(post => {
        return <User.Post key={post.id} id={post.id} />;
      })}
    </Stack>
  );
};

export default observer(UserPosts);
