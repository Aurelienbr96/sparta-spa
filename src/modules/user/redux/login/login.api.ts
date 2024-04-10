import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@app/modules/common';

import { LoginUserDTO, LoginUserResponseDTO, UserToLoginDTO } from './dto';
import { RegisterUserResponseDTO } from '../register';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginUserDTO, UserToLoginDTO>({
      query: (arg) => ({
        method: 'POST',
        url: `/auth/login`,
        body: arg,
      }),
      transformResponse: (response: LoginUserResponseDTO) => {
        return response;
      },
      extraOptions: {},
    }),
    refreshToken: builder.mutation<LoginUserDTO, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/refresh-token',
      }),
      transformResponse: (response: LoginUserResponseDTO) => transformLoginResponse(response),
    }),
    logout: builder.mutation<any, any>({
      query: (id: number) => ({
        method: 'POST',
        url: '/auth/logout',
        body: { id },
      }),
    }),
    registerGoogle: builder.mutation<any, any>({
      query: (arg) => ({
        method: 'POST',
        url: '/auth/google',
        body: arg,
      }),
      transformResponse: (response: RegisterUserResponseDTO) => {
        return {
          id: response.id,
          email: response.email,
          role: response.role,
        };
      },
      extraOptions: {
        transformLoginResponse,
      },
    }),
  }),
});

/* function transformError(e: any) {
  return e;
} */

function transformLoginResponse(response: LoginUserResponseDTO): any {
  return response;
}

export const { useLogoutMutation } = loginApi;
export const { useRegisterGoogleMutation } = loginApi;
export const { useLoginMutation } = loginApi;
export const useRefreshTokenMutation = () => loginApi.useRefreshTokenMutation({ fixedCacheKey: 'shared-refresh-token' });
