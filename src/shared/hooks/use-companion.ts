import { useMemo } from 'react';
import { useDialogsStore, useMainStore } from '@shared/providers';

/**
 * Возвращает данные собеседника
 */
const useCompanion = (dialogId?: number) => {
  const { owner } = useMainStore();
  const { dialogs } = useDialogsStore();

  const dialog = useMemo(() => {
    return dialogs.find(dialog => dialog.id === dialogId);
  }, [dialogs, dialogId]);

  if (!dialog) {
    return undefined;
  }

  const companion =
    dialog.initiator.id === owner.id ? dialog.respondent : dialog.initiator;

  return companion;
};

export default useCompanion;
