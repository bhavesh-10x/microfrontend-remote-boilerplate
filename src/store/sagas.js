import { all, fork } from 'redux-saga/effects';
import * as appSagas from '../containers/App/store/saga';

export default function* sagas() {
  yield all([...Object.values(appSagas)].map(fork));
}
