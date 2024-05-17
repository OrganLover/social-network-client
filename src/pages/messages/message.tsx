import { Flex } from '@mantine/core';
import { Dialogs } from '@widgets';
import { MessagesStoreProvider } from '@shared/providers';

const Messages = () => {
  return (
    <MessagesStoreProvider>
      <Flex p={20}>
        <Dialogs />
      </Flex>
    </MessagesStoreProvider>
  );
};

export default Messages;
