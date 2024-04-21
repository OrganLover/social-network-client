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

import type { UserStoreChangableProperties as ChangableProperties } from './store.interface';
import { LOCAL_STORAGE } from '@shared/local-storage/local-storage.constant';

export default class UserStore {
	id: number | null = null;
	email: number | null = null;
	profile: UserProfile | null = null;
	isAuth: boolean | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	public setProperties(props: ChangableProperties) {
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
		this: UserStore,
		payload: RegisterUserRequestPayload,
	) {
		try {
			const { token, user }: RegisterUserResponsePayload = yield auth.register(
				payload,
			);

			window.localStorage.setItem(LOCAL_STORAGE.TOKEN, token);

			for (const key in user) {
				//@ts-ignore
				this[key] = user[key];
			}

			this.setProperties({ isAuth: true });
		} catch (error) {
			console.log(error);
		}
	});

	public login = flow(function* (
		this: UserStore,
		payload: LoginUserRequestPayload,
	) {
		try {
			const { token, user }: LoginUserResponsePayload = yield auth.login(
				payload,
			);

			window.localStorage.setItem(LOCAL_STORAGE.TOKEN, token);

			for (const key in user) {
				//@ts-ignore
				this[key] = user[key];
			}

			this.setProperties({ isAuth: true });
		} catch (error) {
			console.log(error);
		}
	});

	public authorize = flow(function* (this: UserStore) {
		try {
			const me: GetAuthorizedResponsePayload = yield auth.getAuthorized();

			for (const key in me) {
				//@ts-ignore
				this[key] = me[key];
			}

			this.setProperties({ isAuth: true });
		} catch (error) {
			this.setProperties({ isAuth: false });
			console.log(error);
		}
	});

	public logout = flow(function* (this: UserStore) {
		try {
			const { success }: LogoutUserResponsePayload = yield auth.logout();

			if (!success) {
				return;
			}

			window.localStorage.removeItem(LOCAL_STORAGE.TOKEN);
			this.resetUser();
		} catch (error) {
			console.log(error);
		}
	});
}
