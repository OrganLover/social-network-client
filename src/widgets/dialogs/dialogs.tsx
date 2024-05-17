import { DialogCard, MessagesBlock } from '@entities';
import { MessageForm } from '@features';
import { Group, Paper, Stack, Title } from '@mantine/core';

const Dialogs = () => {
  return (
    <Group w={'100%'}>
      <Stack gap={0}>
        {Array.from([1, 2, 3, 4, 5]).map(() => {
          return <DialogCard />;
        })}
      </Stack>

      <Paper shadow='xl' flex={1} w={'100%'} h={'100%'} p={10}>
        <Stack h={'100%'} justify='space-between'>
          <Title>User Name</Title>
          <MessagesBlock />
          <MessageForm />
        </Stack>
      </Paper>
    </Group>
  );
};

export default Dialogs;
