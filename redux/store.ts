import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { rootReducer } from './slices/rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas/rootSaga';
import { productApi } from './api/productApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};
const reducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const appLogger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});
const isLocal = process.env.NODE_ENV !== 'production';
let store: any = configureStore({
  reducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    isLocal
      ? getDefaultMiddleware()
          .concat(productApi.middleware)
          .concat(sagaMiddleware)
          .concat(appLogger)
      : getDefaultMiddleware()
          .concat(productApi.middleware)
          .concat(sagaMiddleware),
});
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
export const initializeStore = (preloadedState: RootState) => {
  let _store: any = store;
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = {
      ...store.getState(),
      ...preloadedState,
    };
    // Reset the current store
    store = undefined;
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;
  return _store;
};

export function useStore(initialState: RootState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
