/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { API_URL } from '../constants';

type ExtraOptions = {
  transformError?: (error: FetchBaseQueryError) => string;
};

export const defaultQuery = fetchBaseQuery({ baseUrl: API_URL });

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, string> = async (
  args,
  api,
  extraOptions: ExtraOptions = {},
) => {
  const { transformError } = extraOptions;
  try {
    const response = await defaultQuery(args, api, extraOptions);
    if (response.error) {
      const error = (response.error as { error?: string }).error;
      return {
        ...response,
        error: transformGlobalError(transformError?.(response.error) ?? error ?? ''),
      };
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
