import { Form } from '@mantine/form';

import type { MutableRefObject } from 'react';

type MantineFormProps = Parameters<typeof Form>[0];

export type ShowErrorMessage = {
  (message: string, timeout?: number): void;
  (
    { fieldName, message }: { fieldName: string; message: string },
    timeout?: number,
  ): void;
};

export type FormApi = {
  showErrorMessage: ShowErrorMessage;
};

export type FormProps = {
  apiRef?: MutableRefObject<FormApi | undefined>;
} & MantineFormProps;
