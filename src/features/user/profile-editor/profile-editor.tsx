import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Stack, Textarea, Tooltip } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconCard, Input } from '@shared/ui';
import { PiPencilSimpleBold } from 'react-icons/pi';
import { useUserStore } from '@shared/providers';

import { PROFILE_EDITOR_TRANSLATION_PREFIX } from './profile-editor.constant';

const ProfileEditor = () => {
  const [isOpened, setOpenedState] = useState(false);

  const store = useUserStore();
  const { t: translate } = useTranslation();
  const { name, aboutMe } = store;

  console.log({ name });

  const t = useCallback(
    (key: string, args?: Record<string, any>) =>
      translate(`${PROFILE_EDITOR_TRANSLATION_PREFIX}.${key}`, args),
    [translate],
  );
  const tError = useCallback(
    (key: string, args?: Record<string, any>) =>
      translate(`errors:${key}`, args),
    [translate],
  );

  const ValidationError = useMemo(
    () => ({
      userName: tError('auth.invalid-email'),
      aboutMe: tError('auth.invalid-name'),
    }),
    [tError],
  );

  const form = useForm({
    clearInputErrorOnChange: true,
    mode: 'uncontrolled',
    initialValues: {
      userName: name ?? '',
      aboutMe: aboutMe ?? '',
    },
    validate: {
      userName: v => (!v.length ? ValidationError.userName : null),
      aboutMe: v => (v.length > 255 ? ValidationError.aboutMe : null),
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      store.updateProfile(form.getValues());
      setOpenedState(false);
    }
  };

  useEffect(() => {
    form.setValues({
      userName: name ?? '',
      aboutMe: aboutMe ?? '',
    });
  }, [isOpened]);

  return (
    <>
      <Tooltip label={t('tooltip')}>
        <IconCard
          Icon={PiPencilSimpleBold}
          shadow='xl'
          position='top-right'
          positionOffset={10}
          onClick={() => setOpenedState(true)}
        />
      </Tooltip>

      <Modal
        opened={isOpened}
        onClose={() => {
          setOpenedState(false);
        }}
      >
        <Form form={form}>
          <Stack justify={'center'}>
            <Input
              description={t('user-name')}
              {...form.getInputProps('userName')}
            />
            <Textarea
              description={t('about-me')}
              mt={5}
              mb={5}
              size='md'
              {...form.getInputProps('aboutMe')}
            />
            <Button onClick={handleSubmit}>{t('submit-text')}</Button>
          </Stack>
        </Form>
      </Modal>
    </>
  );
};

export default observer(ProfileEditor);
