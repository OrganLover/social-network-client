import { Title } from '@mantine/core';

import type { ErrorMessageProps } from './error-message.interface';

const ErrorMessage = ({
  children,
  fontColor = 'red',
  fontSize = 16,
  fontWeight = 'normal',
  ...props
}: ErrorMessageProps) => {
  return (
    <Title c={fontColor} size={fontSize} fw={fontWeight} {...props}>
      {children}
    </Title>
  );
};

export default ErrorMessage;
