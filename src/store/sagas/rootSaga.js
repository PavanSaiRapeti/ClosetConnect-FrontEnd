import { all} from 'redux-saga/effects';
import {  watchAuthSagas } from './authSaga';
import { watchSearchUserItemSaga } from './cloth';

export default function* rootSaga() {
    console.log('Root saga started');
    yield all([
      ...watchAuthSagas(),
      ...watchSearchUserItemSaga()
    ]);
}