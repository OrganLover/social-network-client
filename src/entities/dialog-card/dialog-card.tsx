import { Avatar, Flex, Paper, Stack, Text } from '@mantine/core';

const DialogCard = () => {
  return (
    <Paper shadow='xl'>
      <Flex justify={'left'} align={'center'} p={5}>
        <Avatar color='blue' size={'xl'} />
        <Stack justify='center' m={10}>
          <Text mt={5} size='lg'>
            Cool Dock
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
};

export default DialogCard;
