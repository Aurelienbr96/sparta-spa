import type { listenerMiddleware } from '@app/app';

import { loginApi } from './login.api';

export function loginListener(middleware: typeof listenerMiddleware) {
  let initialRefreshTimeout: number | undefined;
  let refreshTimeout: number | undefined;

  middleware.startListening({
    matcher: loginApi.endpoints.login.matchFulfilled,
    effect: (_action, { dispatch }) => {
      initialRefreshTimeout = setTimeout(() => {
        dispatch(loginApi.endpoints.refreshToken.initiate());
      }, 4 * 60 * 1000);
    },
  });

  middleware.startListening({
    matcher: loginApi.endpoints.refreshToken.matchFulfilled,
    effect: (_action, { dispatch }) => {
      refreshTimeout = setTimeout(() => {
        dispatch(loginApi.endpoints.refreshToken.initiate());
      }, 4 * 60 * 1000);
    },
  });

  middleware.startListening({
    matcher: loginApi.endpoints.logout.matchPending,
    effect: () => {
      clearTimeout(refreshTimeout);
      clearTimeout(initialRefreshTimeout);
    },
  });
}
