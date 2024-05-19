import { io, type Socket } from 'socket.io-client';
import { flow, makeAutoObservable } from 'mobx';
import { user } from '@shared/api';

import type {
  CreateMessageRequestPayload,
  Dialog,
  Dialogs,
  GetDialogResponsePaylaod,
  UpdateMessageRequestPayload,
} from '@shared/api/types/dialog';

import { WS_DIALOG_EVENT, WS_DIALOG_MESSAGE } from './store.constant';
import {
  DeleteMessageEventPayload,
  EditMessageEventPayload,
  NewMessageEventPayload,
} from './store.interface';

export default class DialogsStore {
  public socket: Socket;
  public dialogs: Dialogs = [];
  public selectedDialog: Dialog | null = null;

  constructor(private readonly userId: number) {
    this.socket = io(import.meta.env._DIALOGS_SOCKET_SERVER_URL, {
      query: { userId },
      transports: ['websocket'],
    });

    makeAutoObservable(this);
  }

  public get sortedMessages() {
    return this.selectedDialog?.messages
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  public setupDialogs = flow(function* (this: DialogsStore) {
    this.dialogs = yield user.dialog.getUserDialogs(this.userId);
  });

  public setupDialog = flow(function* (this: DialogsStore, dialogId: number) {
    const dialog: GetDialogResponsePaylaod = yield user.dialog.getDialog(
      dialogId,
    );

    if (dialog) {
      this.selectedDialog = dialog;
    }
  });

  public deleteDialog = flow(function* (this: DialogsStore, dialogId: number) {
    const deletedDialog = yield user.dialog.deleteDialog(dialogId);

    if (deletedDialog) {
      this.dialogs = this.dialogs.filter(
        dialog => dialog.id !== deletedDialog.id,
      );
    }
  });

  public createMessage(message: string, writerId: number) {
    if (!this.selectedDialog) {
      return;
    }

    const { initiator, respondent } = this.selectedDialog;
    const readerId = initiator.id === writerId ? respondent.id : initiator.id;

    const payload: CreateMessageRequestPayload = {
      value: message,
      dialogId: this.selectedDialog!.id,
      writerId,
      readerId,
    };

    this.socket.emit(WS_DIALOG_MESSAGE.MESSAGE.CREATE, payload);
  }

  public editMessage(payload: UpdateMessageRequestPayload) {
    this.socket.emit(WS_DIALOG_MESSAGE.MESSAGE.UPDATE, payload);
  }

  public deleteMessage(id: number) {
    this.socket.emit(WS_DIALOG_MESSAGE.MESSAGE.DELETE, { id });
  }

  public setupListeners() {
    this.socket.on(
      WS_DIALOG_EVENT.MESSAGE.NEW,
      (payload: NewMessageEventPayload) => {
        this.selectedDialog?.messages.push(payload);
      },
    );

    this.socket.on(
      WS_DIALOG_EVENT.MESSAGE.EDIT,
      (payload: EditMessageEventPayload) => {
        if (!this.selectedDialog) {
          return;
        }

        this.selectedDialog.messages = [
          ...this.selectedDialog.messages.filter(
            message => message.id !== payload.id,
          ),
          payload,
        ];
      },
    );

    this.socket.on(
      WS_DIALOG_EVENT.MESSAGE.DELETE,
      (payload: DeleteMessageEventPayload) => {
        if (!this.selectedDialog) {
          return;
        }

        this.selectedDialog.messages = this.selectedDialog.messages.filter(
          message => message.id !== payload.id,
        );
      },
    );
  }
}
