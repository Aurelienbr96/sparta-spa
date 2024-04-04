import nockRequest, { Scope } from 'nock';
import { API_URL } from '@app/modules/common';

export function nock(): Scope {
  return nockRequest(API_URL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
}

export function createResolvablePromise<T>() {
  let mockResolve!: (value: T) => Promise<void>;

  const resolver = new Promise<T>((resolve) => {
    mockResolve = resolve as (value: T) => Promise<void>;
  });

  return {
    mockResolve,
    resolver,
  };
}
