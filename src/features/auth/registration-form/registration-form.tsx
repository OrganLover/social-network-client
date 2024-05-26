import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

import { validateEmail } from '@shared/utils/validation';
import { useMainStore } from '@shared/providers';
import { Input } from '@shared/ui';

import Form from '../form/form';
import { REGISTRATION_BLOCK_TRANSLATION_PREFIX } from './registration-block.constant';

import type { FormApi } from '../form/form.interface';

const RegistrationForm = () => {
  const { t: translate, i18n } = useTranslation();
  const { owner: user } = useMainStore();

  const formApiRef = useRef<FormApi>();

  const t = useCallback(
    (key: string, args?: Record<string, any>) =>
      translate(`${REGISTRATION_BLOCK_TRANSLATION_PREFIX}.${key}`, args),
    [translate],
  );
  const tLabel = useCallback(
    (key: string, args?: Record<string, any>) =>
      translate(`pages:auth.common.input-label.${key}`, args),
    [translate],
  );
  const tError = useCallback(
    (key: string, args?: Record<string, any>) =>
      translate(`errors:${key}`, args),
    [translate],
  );

  const ValidationError = useMemo(
    () => ({
      email: tError('auth.invalid-email'),
      userName: tError('auth.invalid-name'),
      password: tError('auth.invalid-password'),
      passwordConfirm: tError('auth.invalid-password-confirm'),
    }),
    [tError],
  );

  const form = useForm({
    clearInputErrorOnChange: true,
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      userName: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: v => (!validateEmail(v) ? ValidationError.email : null),
      userName: v => (!v.length ? ValidationError.userName : null),
      password: v => (v.length < 8 ? ValidationError.password : null),
      passwordConfirm: (v, form) =>
        v !== form.password ? ValidationError.passwordConfirm : null,
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const { passwordConfirm, ...rest } = form.getValues();
      const error = await user.register(rest);

      if (error && formApiRef.current) {
        formApiRef.current.showErrorMessage({
          fieldName: 'email',
          message: tError(`server-error.${error}`),
        });
      }
    }
  };

  useEffect(() => {
    const { errors } = form;
    for (const key in errors) {
      //@ts-ignore
      form.setFieldError(key, ValidationError[key]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <>
      <Form form={form} apiRef={formApiRef}>
        <Stack align='center' maw={300} w={'100%'}>
          <Input
            description={tLabel('email')}
            {...form.getInputProps('email')}
          />
          <Input
            description={tLabel('name')}
            {...form.getInputProps('userName')}
          />
          <PasswordInput
            w={'100%'}
            size={'md'}
            description={tLabel('password')}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            w={'100%'}
            size={'md'}
            description={tLabel('password-confirm')}
            {...form.getInputProps('passwordConfirm')}
          />
        </Stack>
      </Form>

      <Button h={50} size='md' onClick={handleSubmit}>
        {t('submit-text')}
      </Button>
    </>
  );
};

export default RegistrationForm;
