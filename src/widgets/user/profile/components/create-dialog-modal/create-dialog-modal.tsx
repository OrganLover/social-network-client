import { useTranslation } from 'react-i18next';
import { Button, Modal, Stack, Textarea } from '@mantine/core';
import { Form, useForm } from '@mantine/form';

import { USER_PAGE_TRANSLATION_PREFIX } from '../../profile.constant';

import type { CreateDialogModalProps } from './create-dialog-modal.interface';
import { useNavigate } from 'react-router-dom';
import { useMainStore, useUserStore } from '@shared/providers';

const CreateDialogModal = ({ isOpened, onClose }: CreateDialogModalProps) => {
  const { t } = useTranslation();
  const user = useUserStore();
  const { owner } = useMainStore();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
    validate: {
      message: v => (v.length === 0 ? 'atleast one character' : null),
    },
  });

  const onCreateDialog = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const { message } = form.getValues();

      const dialogId = await user.createDialog({
        initiatorId: owner.id!,
        respondentId: user.id,
        firstMessage: message,
      });

      navigate('/dialogs', { state: { dialogId } });
    }
  };

  return (
    <Modal opened={isOpened} onClose={onClose}>
      <Form form={form} style={{ width: '100%' }}>
        <Stack>
          <Textarea
            size={'xl'}
            description={t(
              `${USER_PAGE_TRANSLATION_PREFIX}.create-dialog-modal.message`,
            )}
            {...form.getInputProps('message')}
          />

          <Button onClick={onCreateDialog}>
            {t(
              `${USER_PAGE_TRANSLATION_PREFIX}.create-dialog-modal.send-message`,
            )}
          </Button>
        </Stack>
      </Form>
    </Modal>
  );
};

export default CreateDialogModal;
