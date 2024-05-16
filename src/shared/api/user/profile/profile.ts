import ky from '@shared/api/ky.instance';

import type {
  GetUserResponsePayload,
  SaveAvatarRequestPayload,
  SaveAvatarResponsePayload,
  UpdateUserRequestPayload,
  User,
} from '@shared/api/types/user';

const update = async (
  payload: UpdateUserRequestPayload,
): Promise<GetUserResponsePayload> => {
  const { userId, ...data } = payload;

  return ky
    .put(`users/${userId}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .json<GetUserResponsePayload>();
};

const get = async (id: number): Promise<GetUserResponsePayload> => {
  return ky.get(`users/${id}`).json<GetUserResponsePayload>();
};

const getMany = async (): Promise<User[]> => {
  return ky.get('users').json<User[]>();
};

const remove = async (id: number): Promise<GetUserResponsePayload> => {
  return ky.delete(`users/${id}`).json<GetUserResponsePayload>();
};

const saveAvatar = async (
  payload: SaveAvatarRequestPayload,
): Promise<SaveAvatarResponsePayload> => {
  const formData = new FormData();
  formData.append('file', payload.file);

  return ky
    .post(`users/avatars/${payload.userId}`, {
      body: formData,
    })
    .json<SaveAvatarResponsePayload>();
};

export default { update, get, getMany, delete: remove, saveAvatar };
