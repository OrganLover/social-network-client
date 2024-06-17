import { useDialogsStore, useMainStore } from '@shared/providers';
import { useMemo } from 'react';

const useDialog = (userId: number) => {
  const { owner } = useMainStore();
  const { dialogs } = useDialogsStore();

  const dialog = useMemo(() => {
    return dialogs.find(dialog => {
      if (
        (dialog.initiator.id === userId && dialog.respondent.id === owner.id) ||
        (dialog.initiator.id === owner.id && dialog.respondent.id === userId)
      ) {
        return true;
      }
    });
  }, [userId, dialogs, owner]);

  return dialog;
};

export default useDialog;
