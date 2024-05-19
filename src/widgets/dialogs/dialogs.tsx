import { observer } from 'mobx-react-lite';
import { DialogCard, MessagesBlock } from '@entities';
import { MessageForm } from '@features';
import { Group, Paper, Stack, Title } from '@mantine/core';
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
  }, []);

  useEffect(() => {
    if (state?.dialogId) {
      store.setupDialog(state.dialogId);
    }
  }, [state, dialogs]);

  return (
    <Group w={'100%'}>
      <Stack gap={0}>
        {dialogs.map(dialog => {
          return <DialogCard {...dialog} />;
        })}
      </Stack>

      {showBoard ? (
        <Paper shadow='xl' flex={1} w={'100%'} h={'100%'} p={10}>
          <Stack h={'100%'} justify='space-between'>
            <Title>{companion.profile.userName}</Title>
            <MessagesBlock />
            <MessageForm />
          </Stack>
        </Paper>
      ) : null}
    </Group>
  );
};

export default observer(Dialogs);
