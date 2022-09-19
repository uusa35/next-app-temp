import { combineReducers } from '@reduxjs/toolkit';

import { usersSlice } from './usersSlice';
import { todosSlice } from './todosSlice';
import { settingsSlice } from './settingsSlice';
import { localeSlice } from './localeSlice';
import { translationsSlice } from './translationsSlice';

k
import { bootStrappedSlice } from './bootStrappedSlice';
import { productApi } from './../api/productApi';

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
  todos: todosSlice.reducer,
  settings: settingsSlice.reducer,
  locale: localeSlice.reducer,
  translations: translationsSlice.reducer,
  bootStrapped: bootStrappedSlice.reducer,
  [productApi.reducerPath]: productApi.reducer,
});
