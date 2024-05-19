export const WS_DIALOG_MESSAGE = {
  MESSAGE: {
    CREATE: 'create-message',
    UPDATE: 'edit-message',
    DELETE: 'delete-message',
  },
} as const;

export const WS_DIALOG_EVENT = {
  MESSAGE: {
    NEW: 'message_new',
    EDIT: 'message_edit',
    DELETE: 'message_delete',
  },
} as const;
