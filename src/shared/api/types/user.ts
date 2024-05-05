export type User = {
  id: number;
  email: string;
  profile: UserProfile | null;
};

export type UserProfile = {
  userId: number;
  userName: string;
  aboutMe: string | null;
  avatarPath: string | null;
};

export type ServerError = {
  error?: string;
};

export type RegisterUserRequestPayload = {
  email: string;
  password: string;
  userName: string;
};

export type RegisterUserResponsePayload = {
  token?: string;
  user?: User;
} & ServerError;

export type LoginUserRequestPayload = Pick<
  RegisterUserRequestPayload,
  'email' | 'password'
>;

export type LoginUserResponsePayload = RegisterUserResponsePayload;

export type GetAuthorizedResponsePayload = {
  user: User;
} & ServerError;

export type LogoutUserResponsePayload = {
  success: boolean;
};
