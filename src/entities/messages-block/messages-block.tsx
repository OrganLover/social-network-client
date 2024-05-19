import { Flex, Paper, Stack, Text } from '@mantine/core';
import { useDialogsStore, useMainStore } from '@shared/providers';
import { observer } from 'mobx-react-lite';

const MessagesBlock = () => {
  const { owner } = useMainStore();
  const store = useDialogsStore();
  const { selectedDialog } = store;

  if (!selectedDialog) {
    return null;
  }

  return (
    <Stack>
      {selectedDialog.messages.map(message => {
        const isAuthor = message.writer.id === owner.id;

        return (
          <Flex justify={isAuthor ? 'right' : 'left'}>
            <Paper
              p={10}
              pl={isAuthor ? 10 : 100}
              pr={isAuthor ? 100 : 10}
              shadow='xl'
              radius={'md'}
              c={'blue'}
            >
              <Text>{message.value}</Text>
            </Paper>
          </Flex>
        );
      })}
    </Stack>
  );
};

export default observer(MessagesBlock);
