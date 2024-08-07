import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, PasswordInput, Stack } from '@mantine/core';

import { useForm } from '@mantine/form';
import { useMainStore } from '@shared/providers';
import { validateEmail } from '@shared/utils/validation';
import { Input } from '@shared/ui';

import Form from '../form/form';
import { LOGIN_FORM_TRANSLATION_PREFIX } from './login-form.constant';

import type { FormApi } from '../form/form.interface';

const LoginForm = () => {
  const { t: translate, i18n } = useTranslation();
  const { owner: user } = useMainStore();

  const formApiRef = useRef<FormApi>();

  const t = useCallback(
    (key: string, args?: Record<string, any>) =>
      translate(`${LOGIN_FORM_TRANSLATION_PREFIX}.${key}`, args),
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
      password: tError('auth.invalid-password'),
    }),
    [tError],
  );

  const form = useForm({
    clearInputErrorOnChange: true,
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: v => (!validateEmail(v) ? ValidationError.email : null),
      password: v => (v.length < 8 ? ValidationError.password : null),
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const error = await user.login(form.getValues());

      if (error && formApiRef.current) {
        formApiRef.current.showErrorMessage(tError(`server-error.${error}`));
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
            type='email'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            w={'100%'}
            size={'md'}
            description={tLabel('password')}
            {...form.getInputProps('password')}
          />
        </Stack>
      </Form>

      <Button h={50} size='md' onClick={handleSubmit}>
        {t('submit-text')}
      </Button>
    </>
  );
};

export default LoginForm;
