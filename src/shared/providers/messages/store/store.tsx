import { makeAutoObservable } from 'mobx';

export default class MessagesStore {
  constructor() {
    makeAutoObservable(this);
  }
}
