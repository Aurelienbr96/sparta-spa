/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';

import { API_URL } from '../constants';
import { toast } from 'react-toastify';
import i18n from '@app/app/i18n/config';

type ExtraOptions = {
  transformError?: (error: FetchBaseQueryError) => string;
};

export const defaultQuery = fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' });

const formatError = (
  response: { error: any; data?: undefined; meta?: FetchBaseQueryMeta | undefined },
  transformError: ((error: FetchBaseQueryError) => string) | undefined,
) => {
  const error = (response.error as { data?: { message?: string; statusCode?: string } }).data;

  const formattedError = {
    ...response,
    error: {
      message: transformGlobalError(transformError?.(response.error) ?? error?.message ?? ''),
      status: error?.statusCode ?? '',
    },
  };

  return formattedError;
};

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, { message: string; status: string }> = async (
  args,
  api,
  extraOptions: ExtraOptions = {},
) => {
  const { transformError } = extraOptions;

  try {
    const response = await defaultQuery(args, api, extraOptions);

    if (response.error) {
      return formatError(response, transformError);
    }
    return response;
  } catch (e) {
    throw new Error(transformGlobalError(transformError?.(e as any) ?? (e as Error)?.message));
  }
};

export function transformGlobalError(message: string): string {
  if (message?.startsWith?.('app')) return message;
  toast.error(i18n.t('app.error.unknown'));
  return 'app.error.unknown';
}
