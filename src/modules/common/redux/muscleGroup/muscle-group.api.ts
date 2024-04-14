import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, FetchError } from '@app/modules/common';

type MuscleGroupResponse = Array<{
  id: string;
  name: string;
  description: string;
}>;

export const muscleGroupApi = createApi({
  reducerPath: 'muscleGroupApi',
  baseQuery,
  endpoints: (builder) => ({
    getMuscleGroups: builder.query<MuscleGroupResponse, void>({
      query: () => '/muscle-group',
      transformResponse: (response: MuscleGroupResponse) => {
        return response.map((res) => ({
          id: res.id,
          name: res.name,
          description: res.description,
        }));
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
