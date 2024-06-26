import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@app/modules/common';

export const referalLinksApi = createApi({
  reducerPath: 'linkApi',
  baseQuery,
  endpoints: (builder) => ({
    createFeralLink: builder.mutation<any, void>({
      query: () => ({
        method: 'PUT',
        url: `/user/generate-referal-code`,
      }),
      transformResponse: (response) => {
        console.log('response', response);
        return response;
      },
      extraOptions: {},
    }),
  }),
});

/* function transformError(e: any) {
  return e;
}
 */
export const useCreateFeralLinkMutation = () =>
  referalLinksApi.useCreateFeralLinkMutation({ fixedCacheKey: 'create-referal-link' });
