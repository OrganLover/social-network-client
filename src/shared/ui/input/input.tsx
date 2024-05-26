import { TextInput, TextInputProps } from '@mantine/core';

const Input = (props: TextInputProps) => {
  return <TextInput size={'md'} w={'100%'} {...props} />;
};

export default Input;
