import { loginSlice, loginApi, profileApi, registerApi } from '@app/modules/user';
import { combineReducers } from '@reduxjs/toolkit';

export const reduxApis = [loginApi, profileApi, registerApi];

export const rootReducer = combineReducers({
  /* Slice */
  [loginSlice.name]: loginSlice.reducer,
  /* Api */

  [loginApi.reducerPath]: loginApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
});
