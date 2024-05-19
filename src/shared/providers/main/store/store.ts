import { flow, makeAutoObservable } from 'mobx';
import { auth } from '@shared/api';
import type {
  GetAuthorizedResponsePayload,
  LoginUserRequestPayload,
  LoginUserResponsePayload,
  LogoutUserResponsePayload,
  RegisterUserRequestPayload,
  RegisterUserResponsePayload,
  UserProfile,
} from '@shared/api/types/user';

import { LOCAL_STORAGE } from '@shared/local-storage/local-storage.constant';

import type { OwnerStoreChangableProperties as ChangableProperties } from './store.interface';

export default class OwnerStore {
  id: number | null = null;
  email: number | null = null;
  profile: UserProfile | null = null;
  isAuth: boolean | null = null;
  isOwner: boolean | null = true;

  constructor() {
    makeAutoObservable(this);
  }

  public setProperties(props: Partial<ChangableProperties>) {
    for (const key in props) {
      //@ts-ignore
      this[key] = props[key];
    }
  }

  private resetUser() {
    this.id = null;
    this.email = null;
    this.profile = null;
    this.isAuth = false;
  }

  public register = flow(function* (
    this: OwnerStore,
    payload: RegisterUserRequestPayload,
  ) {
    const response: RegisterUserResponsePayload = yield auth.register(payload);

    if (response.error) {
      console.log(response.error);
      return response.error;
    }

    const { token, user } = response;

    if (token && user) {
      window.localStorage.setItem(LOCAL_STORAGE.TOKEN, token);

      for (const key in user) {
        //@ts-ignore
        this[key] = user[key];
      }

      history.pushState(undefined, '', '/users/me');
      this.setProperties({ isAuth: true });
    }
  });

  public login = flow(function* (
    this: OwnerStore,
    payload: LoginUserRequestPayload,
  ) {
    const response: LoginUserResponsePayload = yield auth.login(payload);

    if (response.error) {
      return response.error;
    }

    const { token, user } = response;

    if (token && user) {
      window.localStorage.setItem(LOCAL_STORAGE.TOKEN, token);

      for (const key in user) {
        //@ts-ignore
        this[key] = user[key];
      }

      history.pushState(undefined, '', '/users/me');
      this.setProperties({ isAuth: true });
    }
  });

  public authorize = flow(function* (this: OwnerStore) {
    const response: GetAuthorizedResponsePayload = yield auth.getAuthorized();

    if (response.error) {
      return this.setProperties({ isAuth: false });
    }

    const { user } = response;

    if (user) {
      for (const key in user) {
        //@ts-ignore
        this[key] = user[key];
      }

      this.setProperties({ isAuth: true });
    }
  });

  public logout = flow(function* (this: OwnerStore) {
    const { success }: LogoutUserResponsePayload = yield auth.logout();

    if (!success) {
      return;
    }

    window.localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    this.resetUser();
  });
}
