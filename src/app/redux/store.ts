import { PreloadedState, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import { listeners } from './listeners';
import { reduxApis, rootReducer } from './rootReducer';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginApi, loginSlice } from '@app/modules/user';

export const listenerMiddleware = createListenerMiddleware();

listeners.forEach((listener) => listener(listenerMiddleware));

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [loginSlice.name],
};

const authMiddleware =
  (store: { dispatch: (arg0: any) => any }) =>
  (next: (arg0: any) => any) =>
  async (action: {
    type: string;
    error: any;
    payload: { status: number };
    meta: {
      retry: any;
      arg: any;
    };
  }) => {
    if (
      action.type.endsWith('rejected') &&
      action.error &&
      action.payload?.status === 401 &&
      !action.meta?.retry &&
      !['login', 'register', 'refreshToken'].includes(action.meta?.arg?.endpointName)
    ) {
      const refreshAction = await store.dispatch(loginApi.endpoints.refreshToken.initiate());

      if (loginApi.endpoints.refreshToken.matchFulfilled(refreshAction)) {
        const originalArg = action.meta.arg;
        return store.dispatch({ ...action, meta: { ...action.meta, arg: originalArg, retry: true } });
      }
    }
    return next(action);
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function generateStore(preloadedState?: PreloadedState<typeof rootReducer>) {
  return configureStore({
    preloadedState,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .prepend(listenerMiddleware.middleware)
        .concat(reduxApis.map((api) => api.middleware))
        .concat(authMiddleware),
  });
}

export const store = generateStore();
export const persistor = persistStore(store);

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
