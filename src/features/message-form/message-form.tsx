import { Group, Textarea } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconCard } from '@shared/ui';
import { PiPaperPlane } from 'react-icons/pi';

const MessageForm = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
    validate: {
      message: v => (v.length < 1 ? 'atleast 1 character' : null),
    },
  });

  return (
    <Form form={form} style={{ width: '100%' }}>
      <Group>
        <Textarea flex={1} size='xl' />

        <IconCard Icon={PiPaperPlane} shadow='xl' />
      </Group>
    </Form>
  );
};

export default MessageForm;
