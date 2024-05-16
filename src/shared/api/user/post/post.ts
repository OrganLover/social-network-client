import ky from '@shared/api/ky.instance';

import type {
  CreateUserPostRequestPayload,
  RatePostRequestPayload,
  UpdateUserPostRequestPayload,
  UserPost,
} from '@shared/api/types/post';

// const getPost = (id: number) => {};

// const getUserPosts = (userId: number) => {};

const create = (dto: CreateUserPostRequestPayload): Promise<UserPost> => {
  return ky
    .post('user-posts', {
      body: JSON.stringify(dto),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .json<UserPost>();
};

const update = (dto: UpdateUserPostRequestPayload): Promise<UserPost> => {
  const { id, ...payload } = dto;

  return ky
    .put(`user-posts/${id}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .json<UserPost>();
};

const get = (id: number): Promise<UserPost> => {
  return ky.get(`user-posts/${id}`).json<UserPost>();
};

const getMany = (authorId: number): Promise<UserPost[]> => {
  return ky.get(`user-posts/by-author/${authorId}`).json<UserPost[]>();
};

const remove = (id: number): Promise<UserPost> => {
  return ky.delete(`user-posts/${id}`).json<UserPost>();
};

const rate = (payload: RatePostRequestPayload): Promise<UserPost> => {
  const { postId, ...body } = payload;

  return ky
    .put(`user-posts/rate/${postId}`, {
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .json<UserPost>();
};

export default { create, update, get, getMany, delete: remove, rate };
