import { LoginFixture } from '@app/modules/user/fixtures';
import { nock, waitFor, getApiState } from '@app/testing';
import { generateStore } from '@app/app';

import { loginApi } from '../login.api';

describe('Login API', () => {
  describe('Login', () => {
    it('Should return user and token', async () => {
      nock().post('/auth/login').reply(201, LoginFixture.response.successful);
      const store = generateStore();
      store.dispatch(loginApi.endpoints.login.initiate(LoginFixture.arg.user));

      await waitFor(() => {
        const login = getApiState(store, 'loginApi', 'login');
        expect(login?.data).toEqual(LoginFixture.response.successful);
      });
    });

    it('Should return app.error.unknown if it fails', async () => {
      nock().post('/auth/login').reply(500);
      const store = generateStore();
      store.dispatch(loginApi.endpoints.login.initiate(LoginFixture.arg.user));

      await waitFor(() => {
        const login = getApiState(store, 'loginApi', 'login');
        expect(login?.error).toBe('app.error.unknown');
      });
    });
  });

  describe('Refresh Token', () => {
    it('Should return user and token', async () => {
      nock().post('/auth/refresh-token').reply(201, LoginFixture.response.successful);
      const store = generateStore();
      store.dispatch(loginApi.endpoints.refreshToken.initiate());

      await waitFor(() => {
        const login = getApiState(store, 'loginApi', 'refreshToken');
        expect(login?.data).toEqual(LoginFixture.response.successful);
      });
    });

    it('Should return app.error.unknown if it fails', async () => {
      nock().post('/auth/refresh-token').reply(500);
      const store = generateStore();
      store.dispatch(loginApi.endpoints.refreshToken.initiate());

      await waitFor(() => {
        const login = getApiState(store, 'loginApi', 'refreshToken');
        expect(login?.error).toBe('app.error.unknown');
      });
    });
  });
});
