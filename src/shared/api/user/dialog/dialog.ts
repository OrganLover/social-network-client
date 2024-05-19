import ky from '@shared/api/ky.instance';
import type {
  CreateDialogRequestPayload,
  Dialog,
} from '@shared/api/types/dialog';

const createDialog = (payload: CreateDialogRequestPayload): Promise<Dialog> => {
  return ky
    .post('dialogs', {
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .json<Dialog>();
};

const getDialog = (id: number): Promise<Dialog> => {
  return ky.get(`dialogs/${id}`).json<Dialog>();
};

const getUserDialogs = (userId: number) => {
  return ky.get(`dialogs/by-user/${userId}`).json<Dialog>();
};

const deleteDialog = (id: number) => {
  return ky.delete(`dialogs/${id}`).json<Dialog>();
};

export default { createDialog, getDialog, getUserDialogs, deleteDialog };
