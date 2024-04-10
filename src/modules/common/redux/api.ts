/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { API_URL } from '../constants';

type ExtraOptions = {
  transformError?: (error: FetchBaseQueryError) => string;
};

export const defaultQuery = fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' });

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, string> = async (
  args,
  api,
  extraOptions: ExtraOptions = {},
) => {
  const { transformError } = extraOptions;

  try {
    const response = await defaultQuery(args, api, extraOptions);

    if (response?.error && response.error?.status === 401 && api?.endpoint !== 'login') {
      const refreshResult = await defaultQuery({ url: '/auth/refresh-token', method: 'POST' }, api, extraOptions);
      if (refreshResult.data) {
        await baseQuery(args, api, extraOptions);
      } else {
        // reset local storage
      }
    }
    // console.log('response', response);
    if (response.error) {
      const error = (response.error as { error?: string }).error;
      const formattedError = {
        ...response,
        error: transformGlobalError(transformError?.(response.error) ?? error ?? ''),
      };

      return formattedError;
    }
    return response;
  } catch (e) {
    throw new Error(transformGlobalError(transformError?.(e as any) ?? (e as Error)?.message));
  }
};

export function transformGlobalError(message: string): string {
  if (message?.startsWith?.('app')) return message;
  return 'app.error.unknown';
}
