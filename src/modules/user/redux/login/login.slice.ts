import { createSlice } from '@reduxjs/toolkit';

import { loginApi } from './login.api';

import { referalLinksApi } from '../profile';
import { UserDomainModel } from '../../user.domain-model';

type State = {
  user: UserDomainModel.User;
  isSuccess: boolean;
};

const initialState: State = {
  user: UserDomainModel.nullUser,
  isSuccess: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    /* Login API */
    builder.addMatcher(loginApi.endpoints.login.matchPending, () => initialState);
    builder.addMatcher(loginApi.endpoints.login.matchRejected, () => initialState);
    builder.addMatcher(referalLinksApi.endpoints.createFeralLink.matchFulfilled, (state, action) => ({
      ...state,
      user: action.payload,
    }));

    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (_state, action) => {
      return {
        user: action.payload,
        isSuccess: true,
      };
    });
    builder.addMatcher(loginApi.endpoints.registerGoogle.matchFulfilled, (_state, action) => {
      return {
        user: action.payload,
        isSuccess: true,
      };
    });
    /* Refresh Token API */
    builder.addMatcher(loginApi.endpoints.refreshToken.matchRejected, () => {
      return initialState;
    });
    builder.addMatcher(loginApi.endpoints.refreshToken.matchFulfilled, (_state, action) => {
      return {
        isSuccess: true,
        user: action.payload,
      };
    });
    builder.addMatcher(loginApi.endpoints.logout.matchPending, () => initialState);
  },
});

export const { reset } = loginSlice.actions;
