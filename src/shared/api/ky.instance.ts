import Ky, { type BeforeRequestHook } from 'ky';

const beforeRequestHooks: BeforeRequestHook[] = [
  request => {
    request.headers.set(
      'Authorization',
      window.localStorage.getItem('token') ?? '',
    );
  },
];

const ky = Ky.create({
  credentials: 'include',
  prefixUrl: import.meta.env._API_URL,
  hooks: { beforeRequest: beforeRequestHooks },
  throwHttpErrors: false,
});

export default ky;
