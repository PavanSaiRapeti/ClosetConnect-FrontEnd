import { put, call, takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
import {  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, REGISTER_SUCCESS, VALIDATE_TOKEN_FAILURE, VALIDATE_TOKEN_SUCCESS, SET_LOADING, LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT_REQUEST, VALIDATE_TOKEN_REQUEST } from '../../types/apiActionTypes';
import axios from 'axios';
import { getUserEndpoint, handlerEndpoint, loginUserEndpoint, registerUserEndpoint } from 'config/env';
import { destroyCookie, setCookie } from 'nookies';
import { validateTokenFailure, validateTokenSuccess } from 'store/actions/authAction';
import Router from 'next/router';

export function* loginSaga(action) {
    console.log('Login saga triggered', action);
    try {
        yield put({ type: SET_LOADING ,isLoading:true });
        const { email, password } = action.payload;
        const requestData = { url: loginUserEndpoint, payload: { email, password } }; 
        const response = yield call(axios.post, handlerEndpoint, requestData);
        const {token , id}=response.data
        console.log('==>t0',token);
        setCookie(null, 'token', token, {
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        setCookie(null, 'userId', id, {
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        if (response) {
            yield put({ type: LOGIN_SUCCESS, payload: response.data}); 
            yield put({ type: SET_LOADING ,isLoading:false });
            yield call(Router.push, '/profile');
        } else {
            yield put({ type: LOGIN_FAILURE, error: response.error });
            yield put({ type: SET_LOADING ,isLoading:false });
        }
    } catch (error) {
        console.error('Login error:', error.response);
        yield put({ type: 'SET_ERROR', payload: error?.response?.data?.message?.[0] || "unKnown error" });
        yield put({ type: SET_LOADING ,isLoading:false });
    }
}

export function* validateTokenAndGetUserSaga(action) {
  console.log('validated saga triggered', action);
    const { token, userId, headers } = action.payload;
    console.log('==>',action.payload)
    if (!token || !userId) {
      yield put(validateTokenFailure('Token or userId is missing'));
      return;
    }
    try {
      const requestData = { url: getUserEndpoint(userId), payload: {} };
      const response = yield call(axios.get, requestData.url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          ...headers
        }
      });
      console.log('==>response',response.data)
      if (response.data) {
        yield put(validateTokenSuccess(response.data));
      } else {
        yield put(validateTokenFailure('No data in response'));
      }
    } catch (error) {
      console.error('Error validating token and getting user: ' + error.message);
      yield put(validateTokenFailure(error.message));
    }
  }
  
export function* registerSaga(action) {
    try {
      debugger;
        const requestData = { url: registerUserEndpoint, payload: {  ...action.payload} }; 
        const response = yield call(axios.post, handlerEndpoint, requestData);
        const {token , id}=response.data
        setCookie(null, 'token', token, {
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        setCookie(null, 'userId', id, {
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        debugger;
        if (response.success) {
            yield put({ type: REGISTER_SUCCESS, payload: {  token: response.data.token } });
            yield put({ type: SET_LOADING ,isLoading:false });
        } else {
          yield put({ type: 'SET_ERROR', payload: error.response.data.message[0] });
          yield put({ type: SET_LOADING ,isLoading:false });
        }
    } catch (error) {
        yield put({ type: 'SET_ERROR', payload: error?.response?.data?.message?.[0] || "unKnown error"  });
        yield put({ type: SET_LOADING ,isLoading:false });
    }
}

export function* logoutSaga(action) {
  console.log('out triggres', action);
    try {
        destroyCookie(null, 'token', { path: '/' });
        destroyCookie(null, 'userId', { path: '/' });
        yield put({ type: LOGOUT_SUCCESS });
    } catch (error) {
        yield put({ type: LOGOUT_FAILURE, error: error.message });
    }
}

export function* watchAuthSagas() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(REGISTER_REQUEST, registerSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(VALIDATE_TOKEN_REQUEST, validateTokenAndGetUserSaga);
}