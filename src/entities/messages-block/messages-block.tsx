import { Flex, Paper, Stack, Text } from '@mantine/core';
import { useMainStore } from '@shared/providers';

const MessagesBlock = () => {
  const { owner } = useMainStore();

  const messages = [
    {
      id: 1,
      authorId: 1,
      value: 'hello friend',
    },
    {
      id: 1,
      authorId: 2,
      value: 'bye friend',
    },
    {
      id: 1,
      authorId: 1,
      value: 'you are gonna die',
    },
  ];

  return (
    <Stack>
      {messages.map(message => {
        const isAuthor = message.authorId === owner.id;

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

export default MessagesBlock;
