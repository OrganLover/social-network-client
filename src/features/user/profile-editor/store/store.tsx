import { makeAutoObservable } from 'mobx';

export default class ProfileEditorStore {
  public userName = '';
  public aboutMe = '';

  constructor() {
    makeAutoObservable(this);
  }
}
