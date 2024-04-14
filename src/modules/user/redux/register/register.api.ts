import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, FetchError } from '@app/modules/common';

import { RegisterUserErrorDTO } from './dto';
import { UserApiModel } from '../../user.api-model';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<UserApiModel.Register.Output, UserApiModel.Register.Input>({
      query: (arg) => ({
        method: 'POST',
        url: '/auth/register',
        body: arg,
      }),
      transformResponse: (response: UserApiModel.Register.Output) => {
        return {
          id: response.id,
          email: response.email,
          role: response.role,
          googleId: response.googleId,
          referalCode: response.referalCode,
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
