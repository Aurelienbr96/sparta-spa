import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, FetchError } from '@app/modules/common';
import { MuscleGroupApiModel } from '@app/modules/muscle-group/muscle.api-model';

export const muscleGroupApi = createApi({
  reducerPath: 'muscleGroupApi',
  baseQuery,
  endpoints: (builder) => ({
    getMuscleGroups: builder.query<MuscleGroupApiModel.GetAll.Output, void>({
      query: () => '/muscle-group',
      transformResponse: (response: MuscleGroupApiModel.GetAll.Output) => {
        return response;
      },
      extraOptions: {
        transformError,
      },
    }),
    createMuscleGroup: builder.mutation<MuscleGroupApiModel.Create.Output, MuscleGroupApiModel.Create.Input>({
      query: (body) => ({
        method: 'POST',
        url: `/muscle-group`,
        body,
      }),
      transformResponse: (response: MuscleGroupApiModel.Create.Output) => {
        return response;
      },
      extraOptions: {
        transformError,
      },
    }),
  }),
});

function transformError(e: FetchError<any>) {
  if (e?.status === 400) return e?.data?.message;
  if (e?.status === 409) {
    const conflicts = e.data?.conflicts;
    if (conflicts?.includes('email')) return 'app.page.register.error.email';
    if (conflicts?.includes('username')) return 'app.page.register.error.username';
  }

  return undefined;
}

export const { useGetMuscleGroupsQuery } = muscleGroupApi;
export const { useCreateMuscleGroupMutation } = muscleGroupApi;
