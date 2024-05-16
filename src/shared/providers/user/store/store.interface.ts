import { UserPost } from '@shared/api/types/post';

export type UserStoreChangableProperties = {
  // name: string | null;
  // aboutMe: string | null;
  // avatarUrl: string | null;
  // posts: UserPost[];
  selectedPost: UserPost | null;
  isLoading: boolean;
  modalMode: ModalMode;
};

export type ModalMode = 'create' | 'update' | undefined;
