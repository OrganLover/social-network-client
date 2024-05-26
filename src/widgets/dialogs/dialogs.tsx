import { observer } from 'mobx-react-lite';
import { DialogCard, MessagesBlock } from '@entities';
import { MessageForm } from '@features';
import { Avatar, Drawer, Flex, Group, Paper, Stack, Text } from '@mantine/core';
import { useDialogsStore } from '@shared/providers';
import { useCompanion } from '@shared/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { IconCard } from '@shared/ui';
import { PiUsers } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import getAvatarUrl from '@shared/utils/get-avatar-url';

const Dialogs = () => {
  const [isUsersListOpened, setUsersListOpenedState] = useState(false);
  const { t } = useTranslation();

  const { state } = useLocation();
  const { width } = useViewportSize();

  const store = useDialogsStore();
  const { dialogs, selectedDialog } = store;
  const companion = useCompanion(selectedDialog?.id);

  const showBoard = selectedDialog && companion;
  const hideList = width <= 800;

  useEffect(() => {
    const setup = async () => {
      store.setupListeners();
      await store.setupDialogs();
    };

    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state?.dialogId) {
      store.setupDialog(state.dialogId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, dialogs]);

  const avatarSymbols = useMemo(() => {
    return companion?.profile.userName
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companion?.profile.userName]);

  const avatarUrl = useMemo(() => {
    if (companion?.profile.avatarPath) {
      return getAvatarUrl(companion.profile.avatarPath);
    }

    return undefined;
  }, [companion?.profile.avatarPath]);

  if (!dialogs.length) {
    return (
      <Flex justify={'center'} align={'center'} w={'100%'} h={'100%'}>
        <Text>{t('pages:main.dialogs-page.no-dialogs')}</Text>
      </Flex>
    );
  }

  if (!selectedDialog) {
    return (
      <Stack p={20} w={'100%'} h={'100%'}>
        <Text size='20px'>{t('pages:main.dialogs-page.dialogs')}</Text>
        <Stack w={'100%'} h={'100%'} align='center' justify='start'>
          {dialogs.map(dialog => {
            return (
              <div style={{ maxWidth: 500, width: '100%' }}>
                <DialogCard {...dialog} />
              </div>
            );
          })}
        </Stack>
      </Stack>
    );
  }

  return (
    <Group w={'100%'} align='start' p={10}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: hideList ? '1fr' : '300px 1fr',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Drawer
          opened={isUsersListOpened}
          onClose={() => setUsersListOpenedState(false)}
          title={
            <Text size='20px'>{t('pages:main.dialogs-page.dialogs')}</Text>
          }
        >
          <Stack gap={0}>
            {dialogs.map(dialog => {
              return (
                <div onClick={() => setUsersListOpenedState(false)}>
                  <DialogCard {...dialog} />
                </div>
              );
            })}
          </Stack>
        </Drawer>

        {hideList ? null : (
          <Stack gap={0}>
            {dialogs.map(dialog => {
              return <DialogCard {...dialog} />;
            })}
          </Stack>
        )}

        <Paper shadow='xl' flex={1} w={'100%'} h={'100%'} p={10}>
          {showBoard ? (
            <Stack h={'100%'} justify='space-between'>
              <Group
                justify='space-between'
                align='center'
                pos={'relative'}
                w={'100%'}
              >
                <Group wrap='nowrap'>
                  <Avatar size={'xl'} color='indigo' src={avatarUrl}>
                    {avatarSymbols}
                  </Avatar>
                  <Text size='30px' lineClamp={1}>
                    {companion.profile.userName}
                  </Text>
                </Group>

                {hideList ? (
                  <IconCard
                    Icon={PiUsers}
                    onClick={() => setUsersListOpenedState(true)}
                    position='top-right'
                  />
                ) : null}
              </Group>
              <MessagesBlock />
              <MessageForm />
            </Stack>
          ) : (
            <Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
              <Text>{t(`pages:main.dialogs-page.select-dialog`)}</Text>
            </Flex>
          )}
        </Paper>
      </div>
    </Group>
  );
};

export default observer(Dialogs);
