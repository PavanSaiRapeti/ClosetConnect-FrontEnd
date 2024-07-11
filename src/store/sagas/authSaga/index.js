import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../types/apiActionTypes';
import { loginUser, registerUser } from '../../../pages/api/auth/auth';

export function* loginSaga(action) {
    try {
        const response = yield call(loginUser, action.payload);
        if (response.isAuthenticated) {
            yield put({ type: LOGIN_SUCCESS, payload: response.data });
        } else {
            yield put({ type: LOGIN_FAILURE, error: response.error });
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, error: error.response.data.message });
    }
}

export function* registerSaga(action) {
    try {
        const response = yield call(registerUser, action.payload);
        if (response.success) {
            yield put({ type: 'REGISTER_SUCCESS', payload: { isAuthenticated: true, user: null } });
        } else {
            yield put({ type: LOGIN_FAILURE, error: response.error });
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, error: error.response.data.message });
    }
}

export function* logoutSaga() {
    try {
        localStorage.removeItem('token');
        yield put({ type: LOGOUT_SUCCESS });
    } catch (error) {
        yield put({ type: LOGOUT_FAILURE, error: error.message });
    }
}