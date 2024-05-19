import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Indicator,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMainStore, useUserStore } from '@shared/providers';
import CreateDialogModal from './components/create-dialog-modal/create-dialog-modal';
import { USER_PAGE_TRANSLATION_PREFIX } from './profile.constant';

const UserProfile = () => {
  const [isModalOpened, setModalOpenedState] = useState(false);

  const user = useUserStore();
  const { owner } = useMainStore();
  const { name, aboutMe, avatarUrl, isLoading } = user;

  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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
        <Stack justify={'left'} align={'center'}>
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
          {!owner.isOwner ? (
            <Button w={'100%'} onClick={() => setModalOpenedState(true)}>
              {t(`${USER_PAGE_TRANSLATION_PREFIX}.start-dialog`)}
            </Button>
          ) : null}

          <CreateDialogModal
            isOpened={isModalOpened}
            onClose={() => setModalOpenedState(false)}
          />
        </Stack>
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
