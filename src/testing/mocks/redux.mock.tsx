/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/prefer-default-export */
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { generateStore, store as appStore } from '@app/app';
import { MutationSubState } from '@reduxjs/toolkit/dist/query/core/apiState';

import { ProvidersRenderOptions } from '../testing';

export function withRedux(children: ReactElement, options: ProvidersRenderOptions) {
  return <Provider store={options.store ?? generateStore()}>{children}</Provider>;
}

export function getApiState(store: typeof appStore, key: string, endpoint: string) {
  const state = store.getState();
  // @ts-ignore
  const api = state[key];

  // @ts-ignore
  return Object.values(api?.mutations).find((mutation) => mutation?.endpointName === endpoint) as
    | MutationSubState<any>
    | undefined;
}
