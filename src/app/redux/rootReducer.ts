import { muscleGroupApi } from '@app/modules/common/redux/muscleGroup/muscle-group.api';
import { muscleGroupSlice } from '@app/modules/common/redux/muscleGroup/muscle-group.slice';
import { registerApi, loginSlice, referalLinksApi, loginApi } from '@app/modules/user';

import { combineReducers } from '@reduxjs/toolkit';

export const reduxApis = [loginApi, referalLinksApi, registerApi, muscleGroupApi];

export const rootReducer = combineReducers({
  /* Slice */
  [loginSlice.name]: loginSlice.reducer,
  [muscleGroupSlice.name]: muscleGroupSlice.reducer,
  /* Api */
  [loginApi.reducerPath]: loginApi.reducer,
  [referalLinksApi.reducerPath]: referalLinksApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [muscleGroupApi.reducerPath]: muscleGroupApi.reducer,
});
