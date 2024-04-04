import { State } from '@app/app';
import { createSelector } from '@reduxjs/toolkit';

export const selectLogin = createSelector(
  (state: State) => state,
  (state) => state.login,
);

export const selectLoginUser = createSelector(selectLogin, (login) => login.user);
export const selectLoginIsSuccess = createSelector(selectLogin, (login) => login.isSuccess);
