import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Flex, Paper, Stack, Text } from '@mantine/core';

import type { Dialogs } from '@shared/api/types/dialog';
import { useMainStore } from '@shared/providers';
import getAvatarUrl from '@shared/utils/get-avatar-url';

const DialogCard = ({ id, initiator, respondent }: Dialogs[0]) => {
  const { owner } = useMainStore();
  const navigate = useNavigate();

  const companion = initiator.id === owner.id ? respondent : initiator;

  const avatarUrl = useMemo(() => {
    if (companion.profile.avatarPath) {
      return getAvatarUrl(companion.profile.avatarPath);
    }

    return undefined;
  }, [companion.profile.avatarPath]);

  const avatarSymbols = useMemo(() => {
    return companion.profile.userName
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companion.profile.userName]);

  return (
    <Paper
      shadow='xl'
      onClick={() => navigate('/dialogs', { state: { dialogId: id } })}
      m={5}
      style={{ cursor: 'pointer' }}
    >
      <Flex justify={'left'} align={'center'} p={5}>
        <Avatar color='blue' size={'xl'} src={avatarUrl}>
          {avatarSymbols}
        </Avatar>
        <Stack justify='center' m={10}>
          <Text mt={5} size='lg'>
            {companion.profile.userName}
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
};

export default observer(DialogCard);
