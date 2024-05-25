import { observer } from 'mobx-react-lite';
import { Flex } from '@mantine/core';
import { Dialogs } from '@widgets';
import { DialogsStoreProvider, useMainStore } from '@shared/providers';

const DialogsPage = () => {
  const { owner } = useMainStore();

  return (
    <DialogsStoreProvider userId={owner.id!}>
      <Flex p={20} h={'100%'}>
        <Dialogs />
      </Flex>
    </DialogsStoreProvider>
  );
};

export default observer(DialogsPage);
