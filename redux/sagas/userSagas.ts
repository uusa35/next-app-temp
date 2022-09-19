import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../pages/api';
import { User, Users } from '../../types';
import { setUser, setUsers } from '../slices/usersSlice';
import { getSettings, setSettings } from '../slices/settingsSlice';
import { setTranslations, getTranslations } from '../slices/translationsSlice';
import { setLocale } from '../slices/localeSlice';

export function* startGetUsersScenario(action: PayloadAction<string>) {
  const elements: Users = yield call(api.getUsers, action.payload);
  yield put(setUsers(elements));
}

export function* startGetUserScenario(action: PayloadAction<string>) {
  const element: User = yield call(api.getUser, action.payload);
  // const auth:User  = yield call(api.getAuthenticatedUser);
  yield put(setUser(element));
}

export function* startEnableBootStrappedScenario() {
  yield put(getSettings());
  yield put(getTranslations());
  yield put(setLocale('ar'));
  yield put(getTranslations());
  // yield put(disableBootStrapped({}));
}

export function* startGetSettingsScenario(action: PayloadAction<any>) {
  try {
    const element: Object = yield call(api.getSettings);
    yield put(setSettings(element));
  } catch (e) {
    console.log('e', e);
  }
}

export function* startGetTranslationsScenario() {
  try {
    const translations: {} = yield call(api.getTrans);
    yield put(setTranslations(translations));
    // yield put({type: 'translations/setTranslations', payload: translations});
  } catch (e) {
    console.log('e ===> from trans', e);
  } finally {
  }
}

export function* startChangeLangScenario(action: PayloadAction<string>) {
  try {
    yield call(api.changeLang, action.payload);
  } catch (e) {
    console.log('e ===> from trans', e);
  } finally {
  }
}
