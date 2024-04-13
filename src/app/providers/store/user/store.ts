import { flow, makeAutoObservable } from 'mobx';
import { auth } from '@shared/api';

import type {
	GetAuthorizedResponsePayload,
	UserProfile,
} from '@shared/api/types/user';

import type { UserStoreChangableProperties as ChangableProperties } from './store.interface';

export default class UserStore {
	id: number | null = null;
	email: number | null = null;
	profile: UserProfile | null = null;
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}

	public setProperties(props: ChangableProperties) {
		for (const key in props) {
			//@ts-ignore
			this[key] = props[key];
		}
	}

	public authorize = flow(function* (this: UserStore) {
		try {
			const me: GetAuthorizedResponsePayload = yield auth.getAuthorized();

			if (!me) {
				return false;
			}

			for (const key in me) {
				//@ts-ignore
				this[key] = me[key];
			}

			this.setProperties({ isAuth: true });

			return true;
		} catch (error) {
			return false;
		}
	});
}
