import { flow, makeAutoObservable } from 'mobx';
import { user } from '@shared/api';

import type {
  GetUserResponsePayload,
  SaveAvatarResponsePayload,
  UpdateUserRequestPayload,
} from '@shared/api/types/user';
import type {
  CreateUserPostRequestPayload,
  GetAuthorPostsResponsePayload,
  RatePostRequestPayload,
  UpdateUserPostRequestPayload,
  UserPost,
} from '@shared/api/types/post';
import {
  ModalMode,
  UserStoreChangableProperties as ChangableProperties,
} from './store.interface';

export default class UserStore {
  public id;
  public name: string | null = null;
  public aboutMe: string | null = null;
  public avatarUrl: string | null = null;
  public selectedPost: UserPost | null = null;
  public posts: UserPost[] = [];
  public isLoading = true;
  public modalMode: ModalMode = undefined;

  constructor(userId: number) {
    this.id = userId;
    makeAutoObservable(this);
  }

  public get sortedPosts() {
    return this.posts
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  public setProperties(props: Partial<ChangableProperties>) {
    for (const key in props) {
      //@ts-ignore
      this[key] = props[key];
    }
  }

  public setupProfile = flow(function* (this: UserStore) {
    const userData: GetUserResponsePayload = yield user.profile.get(this.id);

    if (userData) {
      const { userName, aboutMe, avatarPath } = userData.profile;

      this.name = userName;
      this.aboutMe = aboutMe;
      this.avatarUrl = `${import.meta.env._URL_TO_AVATARS}/${avatarPath}`;
      this.isLoading = false;
    }
  });

  public setupPosts = flow(function* (this: UserStore) {
    const posts: GetAuthorPostsResponsePayload = yield user.post.getMany(
      this.id,
    );

    this.posts = posts;
  });

  public updateProfile = flow(function* (
    this: UserStore,
    payload: Omit<UpdateUserRequestPayload, 'userId'>,
  ) {
    const updatedUser: GetUserResponsePayload = yield user.profile.update({
      ...payload,
      userId: this.id,
    });

    if (updatedUser) {
      const { userName, aboutMe, avatarPath } = updatedUser.profile;

      this.name = userName;
      this.aboutMe = aboutMe;
      this.avatarUrl = `${import.meta.env._URL_TO_AVATARS}/${avatarPath}`;
    }
  });

  public createPost = flow(function* (
    this: UserStore,
    payload: CreateUserPostRequestPayload,
  ) {
    const post = yield user.post.create(payload);

    if (post.id) {
      this.posts.push(post);
    }
  });

  public updatePost = flow(function* (
    this: UserStore,
    payload: UpdateUserPostRequestPayload,
  ) {
    const post = yield user.post.update(payload);

    if (post.id) {
      const newPosts = [...this.posts.filter(({ id }) => id !== post.id), post];
      this.posts = newPosts;
    }
  });

  public deletePost = flow(function* (this: UserStore, id: number) {
    const deletedPost = yield user.post.delete(id);

    if (deletedPost.id) {
      this.posts = this.posts.filter(post => post.id !== deletedPost.id);
    }
  });

  public saveAvatar = flow(function* (this: UserStore, file: File) {
    const { fileName }: SaveAvatarResponsePayload =
      yield user.profile.saveAvatar({
        userId: this.id,
        file,
      });

    if (fileName) {
      this.avatarUrl = `${import.meta.env._URL_TO_AVATARS}/${fileName}`;
    }
  });

  public ratePost = flow(function* (
    this: UserStore,
    payload: RatePostRequestPayload,
  ) {
    const post: UserPost = yield user.post.rate(payload);

    if (post.id) {
      const newPosts = [...this.posts.filter(({ id }) => id !== post.id), post];

      this.posts = newPosts;
    }
  });
}
