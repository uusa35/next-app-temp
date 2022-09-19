import { takeLatest, call, put, all, throttle } from 'redux-saga/effects';
import {
  startGetUsersScenario,
  startGetUserScenario,
  startGetSettingsScenario,
  startEnableBootStrappedScenario,
  startGetTranslationsScenario,
  startChangeLangScenario,
} from './userSagas';
import { persistor } from './../store';
import {
  bootStrappedSlice,
  enableBootStrapped,
} from '../slices/bootStrappedSlice';
import { resetUser, resetUsers, usersSlice } from '../slices/usersSlice';
import { resetToDos } from '../slices/todosSlice';
import { localeSlice } from '../slices/localeSlice';
import { translationsSlice } from '../slices/translationsSlice';
import { settingsSlice } from '../slices/settingsSlice';

export function* triggerStartGetUsers() {
  yield throttle(2000, usersSlice.actions.getUsers, startGetUsersScenario);
}

export function* triggerStartGetUser() {
  yield throttle(5000, usersSlice.actions.getUser, startGetUserScenario);
}

export function* triggerDisableBootStrapped() {
  yield takeLatest(
    bootStrappedSlice.actions.disableBootStrapped,
    startResetScenario
  );
}

export function* triggerEnableBootStrapped() {
  yield takeLatest(
    bootStrappedSlice.actions.enableBootStrapped,
    startEnableBootStrappedScenario
  );
}

export function* triggerGetSettings() {
  yield takeLatest(settingsSlice.actions.getSettings, startGetSettingsScenario);
}

export function* startResetScenario() {
  persistor.purge();
  yield all([put(resetUsers({})), put(resetUser({})), put(resetToDos([]))]);
  yield put(enableBootStrapped());
}

export function* triggerGetTranslations() {
  yield takeLatest(
    translationsSlice.actions.getTranslations,
    startGetTranslationsScenario
  );
}

export function* triggerChangeLang() {
  yield takeLatest(localeSlice.actions.setLocale, startChangeLangScenario);
}
