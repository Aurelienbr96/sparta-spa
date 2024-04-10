import { PreloadedState, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import { listeners } from './listeners';
import { reduxApis, rootReducer } from './rootReducer';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginSlice } from '@app/modules/user';

export const listenerMiddleware = createListenerMiddleware();

listeners.forEach((listener) => listener(listenerMiddleware));

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [loginSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function generateStore(preloadedState?: PreloadedState<typeof rootReducer>) {
  return configureStore({
    preloadedState,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).prepend(listenerMiddleware.middleware);

      return reduxApis.reduce(
        (accumulator: unknown, currentValue) => (accumulator as typeof defaultMiddleware).concat(currentValue.middleware),
        defaultMiddleware,
      ) as typeof defaultMiddleware;
    },
  });
}

export const store = generateStore();
export const persistor = persistStore(store);

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
