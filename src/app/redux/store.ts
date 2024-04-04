import { configureStore, createListenerMiddleware, PreloadedState } from '@reduxjs/toolkit';

import { listeners } from './listeners';
import { reduxApis, rootReducer } from './rootReducer';

export const listenerMiddleware = createListenerMiddleware();

listeners.forEach((listener) => listener(listenerMiddleware));

export function generateStore(preloadedState?: PreloadedState<typeof rootReducer>) {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware().prepend(listenerMiddleware.middleware);

      return reduxApis.reduce(
        (accumulator: unknown, currentValue) => (accumulator as typeof defaultMiddleware).concat(currentValue.middleware),
        defaultMiddleware,
      ) as typeof defaultMiddleware;
    },
  });
}

export const store = generateStore();

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
