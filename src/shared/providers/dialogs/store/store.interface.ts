import { User } from '@shared/api/types/user';

export type NewMessageEventPayload = {
  id: number;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  dialogId: number;
  writer: User;
  reader: User;
};

export type EditMessageEventPayload = NewMessageEventPayload;

export type DeleteMessageEventPayload = NewMessageEventPayload;
