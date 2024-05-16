import { flow, makeAutoObservable } from 'mobx';
import { user } from '@shared/api';

import type { User } from '@shared/api/types/user';

export default class UsersStore {
  public users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setupUsers = flow(function* (this: UsersStore) {
    this.users = yield user.profile.getMany();
  });
}
