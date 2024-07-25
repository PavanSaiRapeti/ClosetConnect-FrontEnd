import { takeEvery, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT_REQUEST, VALIDATE_TOKEN_REQUEST } from '../types/apiActionTypes';
import { loginSaga, logoutSaga, registerSaga, validateTokenAndGetUserSaga } from './authSaga';

export default function* rootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(REGISTER_REQUEST, registerSaga);
    yield takeLatest(LOGOUT_REQUEST, logoutSaga);
    yield takeLatest(VALIDATE_TOKEN_REQUEST, validateTokenAndGetUserSaga);
}