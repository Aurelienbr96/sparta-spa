import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@app/modules/common';

import { UserType } from '../../types';

import { UpdateUserResponseDTO, UserToUpdateDTO } from './dto';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UserType, UserToUpdateDTO>({
      query: (args) => {
        const { id, ...userToUpdate } = args;
        return {
          method: 'PATCH',
          url: `/user/${args.id}/`,
          body: userToUpdate,
        };
      },
      transformResponse: (response: UpdateUserResponseDTO) => ({
        id: response.id,
        email: response.email,
        username: response.username,
        firstname: response.firstname,
        lastname: response.lastname,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
