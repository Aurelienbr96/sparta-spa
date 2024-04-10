import { LoginFixture, UserFixture } from '@app/modules/user/fixtures';
import { nock, waitFor } from '@app/testing';
import { generateStore } from '@app/app';
import { ReplyFnResult } from 'nock/types';

import { loginApi } from '../login.api';
import { nullUser } from '@app/modules/user/types';

describe('Login Slice', () => {
  describe('Login API', () => {
    it('Should reset state when initiating', async () => {
      let mockCb!: (error: any, result: ReplyFnResult) => void;
      nock()
        .post('/auth/login')
        .reply((_uri, _body, cb) => (mockCb = cb));

      const store = generateStore({ login: { user: UserFixture.account.user } });
      store.dispatch(loginApi.endpoints.login.initiate(LoginFixture.arg.user));

      await waitFor(() => {
        expect(store.getState().login).toEqual({
          user: nullUser,
          isSuccess: false,
        });
      });

      await waitFor(() => {
        expect(mockCb).toBeDefined();
        mockCb(null, [201, LoginFixture.response.successful]);
      });
    });

    it('Should reset state when failing', async () => {
      nock().post('/auth/login').reply(500);
      const store = generateStore({ login: { user: UserFixture.account.user } });
      store.dispatch(loginApi.endpoints.login.initiate(LoginFixture.arg.user));

      await waitFor(() => {
        expect(store.getState().login).toEqual({
          user: nullUser,
          isSuccess: false,
        });
      });
    });

    it('Should update state when fullfilled', async () => {
      nock().post('/auth/login').reply(201, LoginFixture.response.successful);
      const store = generateStore();
      store.dispatch(loginApi.endpoints.login.initiate(LoginFixture.arg.user));

      await waitFor(() => {
        expect(store.getState().login).toEqual({
          user: LoginFixture.response.successful,
          isSuccess: true,
        });
      });
    });
  });

  describe('Refresh Token API', () => {
    it('Should reset state when failing', async () => {
      nock().post('/auth/refresh-token').reply(500);
      const store = generateStore({ login: { user: UserFixture.account.user } });
      store.dispatch(loginApi.endpoints.refreshToken.initiate());

      await waitFor(() => {
        expect(store.getState().login).toEqual({
          user: nullUser,
          isSuccess: false,
        });
      });
    });

    it('Should set state when fulfilled', async () => {
      nock().post('/auth/refresh-token').reply(201, LoginFixture.response.successful);
      const store = generateStore();
      store.dispatch(loginApi.endpoints.refreshToken.initiate());

      await waitFor(() => {
        expect(store.getState().login).toEqual({
          user: LoginFixture.response.successful,
          isSuccess: true,
        });
      });
    });
  });

  describe('Logout', () => {
    it('Should reset state', () => {
      nock().post('/auth/logout').reply(201);
      const store = generateStore({ login: { user: UserFixture.account.user } });
      store.dispatch(loginApi.endpoints.logout.initiate(1));

      expect(store.getState().login).toEqual({
        user: nullUser,
        isSuccess: false,
      });
    });
  });
});
