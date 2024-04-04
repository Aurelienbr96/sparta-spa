import { createSlice } from '@reduxjs/toolkit';

import { nullUser, UserType } from '../../types';

import { loginApi } from './login.api';

type State = {
  user: UserType;
  isSuccess: boolean;
};

const initialState: State = {
  user: nullUser,
  isSuccess: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Login API */
    builder.addMatcher(loginApi.endpoints.login.matchPending, () => initialState);
    builder.addMatcher(loginApi.endpoints.login.matchRejected, () => initialState);
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (_state, action) => ({
      user: action.payload,
      isSuccess: true,
    }));
    /* Refresh Token API */
    builder.addMatcher(loginApi.endpoints.refreshToken.matchRejected, () => initialState);
    builder.addMatcher(loginApi.endpoints.refreshToken.matchFulfilled, (_state, action) => ({
      isSuccess: true,
      user: action.payload,
    }));
    builder.addMatcher(loginApi.endpoints.logout.matchPending, () => initialState);
  },
});
