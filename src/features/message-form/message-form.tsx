import { Group, Textarea } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useDialogsStore, useMainStore } from '@shared/providers';
import { IconCard } from '@shared/ui';
import { observer } from 'mobx-react-lite';
import { PiPaperPlane } from 'react-icons/pi';

const MessageForm = () => {
  const { owner } = useMainStore();
  const store = useDialogsStore();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
    validate: {
      message: v => (v.length < 1 ? 'atleast 1 character' : null),
    },
  });

  const onSendMessage = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const { message } = form.getValues();

      store.createMessage(message, owner.id!);
      form.reset();
    }
  };

  return (
    <Form form={form} style={{ width: '100%' }}>
      <Group>
        <Textarea flex={1} size='xl' {...form.getInputProps('message')} />

        <IconCard Icon={PiPaperPlane} shadow='xl' onClick={onSendMessage} />
      </Group>
    </Form>
  );
};

export default observer(MessageForm);
