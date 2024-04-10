import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, FetchError } from '@app/modules/common';

import { RegisterUserDTO, UserToRegisterDTO, RegisterUserResponseDTO, RegisterUserErrorDTO } from './dto';
import { Role } from '@app/modules/common/constants/role.constants';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserDTO, UserToRegisterDTO>({
      query: (arg) => ({
        method: 'POST',
        url: '/auth/register',
        body: arg,
      }),
      transformResponse: (response: RegisterUserResponseDTO) => {
        return {
          id: response.id,
          email: response.email,
          role: response.role as Role,
        };
      },
      extraOptions: {
        transformError,
      },
    }),
  }),
});

function transformError(e: FetchError<RegisterUserErrorDTO>) {
  if (e?.status === 400) return e?.data?.message;
  if (e?.status === 409) {
    const conflicts = e.data?.conflicts;
    if (conflicts?.includes('email')) return 'app.page.register.error.email';
    if (conflicts?.includes('username')) return 'app.page.register.error.username';
  }

  return undefined;
}

export const { useRegisterMutation } = registerApi;
