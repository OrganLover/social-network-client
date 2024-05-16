import type { User } from './user';

export type CreateUserPostRequestPayload = {
  authorId: number;
  title: string;
  content: string;
};

export type UpdateUserPostRequestPayload = {
  id: number;
  title?: string;
  content?: string;
};

export type UserPost = {
  id: number;
  title: string;
  content: string;
  likesCount: number;
  dislikesCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  likedBy: {
    userId: number;
  }[];
  dislikedBy: {
    userId: number;
  }[];
};

export type GetAuthorPostsResponsePayload = UserPost[];

export type RatePostRequestPayload = {
  value: 1 | -1;
  userId: number;
  postId: number;
};
