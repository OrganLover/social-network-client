import { observer } from 'mobx-react-lite';
import { Flex } from '@mantine/core';
import { Dialogs } from '@widgets';

const DialogsPage = () => {
  return (
    <Flex h={'100%'}>
      <Dialogs />
    </Flex>
  );
};

export default observer(DialogsPage);
