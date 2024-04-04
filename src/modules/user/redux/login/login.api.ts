import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@app/modules/common';

import { LoginUserDTO, LoginUserResponseDTO, UserToLoginDTO } from './dto';

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
      transformResponse: (response: LoginUserResponseDTO) => transformLoginResponse(response),
    }),
    refreshToken: builder.mutation<LoginUserDTO, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/refresh-token',
      }),
      transformResponse: (response: LoginUserResponseDTO) => transformLoginResponse(response),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/logout',
      }),
    }),
  }),
});

function transformLoginResponse(response: LoginUserResponseDTO): LoginUserDTO {
  return {
    id: response.id,
    email: response.email,
    username: response.username,
    firstname: response.firstname,
    lastname: response.lastname,
  };
}

export const { useLogoutMutation } = loginApi;
export const useLoginMutation = () => loginApi.useLoginMutation({ fixedCacheKey: 'shared-login' });
export const useRefreshTokenMutation = () => loginApi.useRefreshTokenMutation({ fixedCacheKey: 'shared-refresh-token' });
