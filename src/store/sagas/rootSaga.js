import { takeEvery } from 'redux-saga/effects';
import { LOGIN_REQUEST, REGISTER_REQUEST,LOGOUT_REQUEST } from '../types/apiActionTypes';
import { loginSaga, logoutSaga, registerSaga } from './authSaga';

export default function* rootSaga() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(REGISTER_REQUEST, registerSaga);
    yield takeEvery(LOGOUT_REQUEST, logoutSaga);
}