import type { listenerMiddleware } from '@app/app';

import { loginApi } from '../../../user/redux/login';

import { registerApi } from './register.api';

export function registerListener(middleware: typeof listenerMiddleware) {
  middleware.startListening({
    matcher: registerApi.endpoints.register.matchFulfilled,
    effect: (action, { dispatch }) => {
      const { email, password } = action.meta.arg.originalArgs;
      dispatch(
        loginApi.endpoints.login.initiate(
          {
            email,
            password,
          },
          { fixedCacheKey: 'shared-login' },
        ),
      );
    },
  });
}
