import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@app/modules/common';

import { UserApiModel } from '../../user.api-model';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<UserApiModel.Login.Output, UserApiModel.Login.Input>({
      query: (arg) => ({
        method: 'POST',
        url: `/auth/login`,
        body: arg,
      }),
      transformResponse: (response: UserApiModel.Login.Output) => {
        return response;
      },
      extraOptions: {},
    }),
    refreshToken: builder.mutation<UserApiModel.RefreshToken.Output, UserApiModel.RefreshToken.Input>({
      query: () => ({
        method: 'POST',
        url: '/auth/refresh-token',
      }),
      transformResponse: (response: UserApiModel.RefreshToken.Output) => {
        console.log('response', response);
        return response;
      },
    }),
    logout: builder.mutation<any, any>({
      query: (id: number) => ({
        method: 'POST',
        url: '/auth/logout',
        body: { id },
      }),
    }),
    registerGoogle: builder.mutation<UserApiModel.GoogleOauth.OutPut, UserApiModel.GoogleOauth.Input>({
      query: (arg) => ({
        method: 'POST',
        url: '/auth/google',
        body: arg,
      }),
      transformResponse: (response: UserApiModel.GoogleOauth.OutPut) => {
        console.log('response', response);
        return response;
      },
    }),
  }),
});

export const { useLogoutMutation } = loginApi;
export const { useRegisterGoogleMutation } = loginApi;
export const { useLoginMutation } = loginApi;
export const useRefreshTokenMutation = () => loginApi.useRefreshTokenMutation({ fixedCacheKey: 'shared-refresh-token' });
