import { all, put } from 'redux-saga/effects';
import watchAuthSagas from './authSaga';
import watchSearchSagas from './searchSaga';
import watchItemSagas from './ItemSaga';
import watchTradeSagas from './TradeSaga';
export default function* rootSaga() {
    console.log('Root saga started');
    yield all([
      ...watchAuthSagas(),
      ...watchItemSagas(),
      ...watchTradeSagas(),
      ...watchSearchSagas()
    ]);
}