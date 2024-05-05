import { Form } from '@mantine/form';

import { useState, useEffect, type CSSProperties } from 'react';

import type { FormProps, ShowErrorMessage } from './form.interface';
import ErrorMessage from '@shared/ui/error-message/error-message';

const styles: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const AuthForm = ({ apiRef, form, children }: FormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!apiRef) return;

    const showErrorMessage: ShowErrorMessage = (message, timeout) => {
      if (typeof message === 'string') {
        setErrorMessage(message);
        return setTimeout(() => setErrorMessage(null), timeout ?? 2000);
      }

      form.setFieldError(message.fieldName, message.message);
    };

    apiRef.current = { showErrorMessage };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form form={form} style={styles}>
      {children}

      <ErrorMessage mt={errorMessage ? 20 : undefined}>
        {errorMessage}
      </ErrorMessage>
    </Form>
  );
};

export default AuthForm;
