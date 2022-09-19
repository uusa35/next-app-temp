import { fork, take, all, throttle } from 'redux-saga/effects';
import { REHYDRATE, PURGE } from 'redux-persist/lib/constants';
import {
  triggerStartGetUsers,
  triggerStartGetUser,
  triggerDisableBootStrapped,
  triggerEnableBootStrapped,
  triggerGetSettings,
  triggerGetTranslations,
  triggerChangeLang,
} from './triggers';

export default function* rootSaga() {
  yield all([
    fork(triggerStartGetUsers),
    fork(triggerStartGetUser),
    fork(triggerDisableBootStrapped),
    fork(triggerEnableBootStrapped),
    fork(triggerGetSettings),
    fork(triggerGetTranslations),
    fork(triggerChangeLang),
  ]);
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  yield take(PURGE);
}
