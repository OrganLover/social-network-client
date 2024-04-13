import ky from '../ky.instance';

import type { GetAuthorizedResponsePayload, User } from '../types/user';

export const getAuthorized =
	async (): Promise<GetAuthorizedResponsePayload> => {
		return ky.get('auth/me').json<User | undefined>();
	};
