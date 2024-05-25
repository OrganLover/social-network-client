import { observer } from 'mobx-react-lite';
import { DialogCard, MessagesBlock } from '@entities';
import { MessageForm } from '@features';
import { Grid, Group, Paper, Stack, Title } from '@mantine/core';
import { useDialogsStore } from '@shared/providers';
import { useCompanion } from '@shared/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Dialogs = () => {
  const { state } = useLocation();

  const store = useDialogsStore();
  const { dialogs, selectedDialog } = store;
  const companion = useCompanion(selectedDialog?.id);

  const showBoard = selectedDialog && companion;

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

  return (
    <Group w={'100%'} align='start'>
      <Grid
        columns={10}
        w={'100%'}
        h={'100%'}
        styles={{ inner: { height: '100%' } }}
      >
        <Grid.Col span={2}>
          <Stack gap={0}>
            {dialogs.map(dialog => {
              return <DialogCard {...dialog} />;
            })}
          </Stack>
        </Grid.Col>

        <Grid.Col span={8}>
          {showBoard ? (
            <Paper shadow='xl' flex={1} w={'100%'} h={'100%'} p={10}>
              <Stack h={'100%'} justify='space-between'>
                <Title>{companion.profile.userName}</Title>
                <MessagesBlock />
                <MessageForm />
              </Stack>
            </Paper>
          ) : null}
        </Grid.Col>
      </Grid>
    </Group>
  );
};

export default observer(Dialogs);
