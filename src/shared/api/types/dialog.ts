import type { User } from './user';

export type CreateDialogRequestPayload = {
  initiatorId: number;
  respondentId: number;
  firstMessage?: string;
};

export type CreateMessageRequestPayload = {
  dialogId: number;
  writerId: number;
  readerId: number;
  value: string;
};

export type UpdateMessageRequestPayload = {
  id: number;
  value: string;
};

export type Dialog = {
  id: number;
  messages: Message[];
  initiator: User;
  respondent: User;
};

export type Dialogs = Omit<Dialog, 'messages'>[];

export type Message = {
  id: number;
  value: string;
  writer: User;
  reader: User;
  createdAt: Date;
  updatedAt: Date;
  dialogId: number;
};

export type GetDialogResponsePaylaod = Dialog | undefined;
