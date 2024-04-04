import { UserFixture } from '@app/modules/user/fixtures';
import { generateStore } from '@app/app';

import { selectLogin, selectLoginUser } from '../login.selector';

describe('Login Selector', () => {
  const store = generateStore({ login: { token: 'token', user: UserFixture.account.user } });

  describe('selectLogin', () => {
    it('Should return login state', () => {
      const selected = selectLogin(store.getState());
      expect(selected).toEqual({ token: 'token', user: UserFixture.account.user });
    });
  });

  describe('selectLoginUser', () => {
    it('Should return user from login', () => {
      const selected = selectLoginUser(store.getState());
      expect(selected).toEqual(UserFixture.account.user);
    });
  });
});
