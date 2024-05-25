import { makeAutoObservable } from 'mobx';

import type { PostRatingChangableProperties as ChangableProperties } from './store.interface';

export default class PostRatingStore {
  public id;
  public likesCount = 0;
  public dislikesCount = 0;
  public isLiked = false;
  public isDisliked = false;

  constructor(id: number) {
    this.id = id;
    makeAutoObservable(this);
  }

  public onLike() {
    this.toggle('isLiked');
    this.isDisliked = false;
    console.log(this.likesCount);
  }

  public onDislike() {
    this.toggle('isDisliked');
    this.isLiked = false;
  }

  public toggle(key: keyof ChangableProperties) {
    if (key === 'isLiked') {
      const v = this[key] ? -1 : 1;
      this.likesCount += v;
      this.dislikesCount += -v;
    }

    if (key === 'isDisliked') {
      const v = this[key] ? -1 : 1;
      this.dislikesCount += v;
      this.likesCount += -v;
    }

    //@ts-ignore
    this[key] = !this[key];
  }

  public setProperties(props: Partial<ChangableProperties>) {
    for (const key in props) {
      //@ts-ignore
      this[key] = props[key];
    }
  }
}
