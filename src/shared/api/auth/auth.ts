import ky from '../ky.instance';

import type {
	RegisterUserRequestPayload,
	RegisterUserResponsePayload,
	GetAuthorizedResponsePayload,
	LoginUserRequestPayload,
	LoginUserResponsePayload,
	LogoutUserResponsePayload,
} from '../types/user';

const register = async (
	payload: RegisterUserRequestPayload,
): Promise<RegisterUserResponsePayload> => {
	return ky
		.post('auth/register', {
			body: JSON.stringify(payload),
			headers: {
				'Content-type': 'application/json',
			},
		})
		.json<RegisterUserResponsePayload>();
};

const login = async (
	payload: LoginUserRequestPayload,
): Promise<LoginUserResponsePayload> => {
	return ky
		.post('auth/login', {
			body: JSON.stringify(payload),
			headers: {
				'Content-type': 'application/json',
			},
		})
		.json<LoginUserResponsePayload>();
};

const getAuthorized = async (): Promise<GetAuthorizedResponsePayload> => {
	return ky.get('auth/me').json<GetAuthorizedResponsePayload>();
};

const logout = async (): Promise<LogoutUserResponsePayload> => {
	return ky.post('auth/logout').json<LogoutUserResponsePayload>();
};

export default { register, login, getAuthorized, logout };
