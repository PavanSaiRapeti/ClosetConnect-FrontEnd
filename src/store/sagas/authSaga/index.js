import { put, call, takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
import {  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, REGISTER_SUCCESS, VALIDATE_TOKEN_FAILURE, VALIDATE_TOKEN_SUCCESS, SET_LOADING, LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT_REQUEST, VALIDATE_TOKEN_REQUEST, UPDATE_USER_REQUEST, GET_USER_REQUEST, SET_ERROR } from '../../types/apiActionTypes';
import axios from 'axios';
import { getUserEndpoint, handlerEndpoint, loginUserEndpoint, registerUserEndpoint, updateUserEndpoint } from 'config/env';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { validateTokenFailure, validateTokenSuccess } from 'store/actions/authAction';
import Router from 'next/router';

export function* loginSaga(action) {
    console.log('Login saga triggered', action);
    try {
        const { email, password } = action.payload;
        const requestData = { url: loginUserEndpoint, payload: { email, password } ,isMethod: 'POST'}; 
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
            yield put({ type: SET_ERROR , payload: error?.response?.data?.message?.[0] || "unKnown error" });
        }
    } catch (error) {
        console.error('Login error:', error.response);
        yield put({ type: SET_ERROR, payload: error?.response?.data?.message?.[0] || "unKnown error" });
        yield put({ type: SET_LOADING ,isLoading:false });
    }
}

export function* validateTokenAndGetUserSaga(action) {
  console.log('validated saga triggered', action);
    const { token, userId, headers } = action.payload;
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
      destroyCookie(null, 'token', { path: '/' });
      destroyCookie(null, 'userId', { path: '/' });
        const requestData = { url: registerUserEndpoint, payload: {  ...action.payload} ,isMethod: 'POST'}; 
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
        if (response.success) {
            yield put({ type: REGISTER_SUCCESS, payload: {  token: response.data.token } });
            yield put({ type: SET_LOADING ,isLoading:false });
        } else {
          yield put({ type: SET_ERROR, payload: error.response.data.message[0] });
          yield put({ type: SET_LOADING ,isLoading:false });
        }
    } catch (error) {
        yield put({ type: SET_ERROR , payload: error?.response?.data?.message?.[0] || "unKnown error"  });
        yield put({ type: SET_LOADING ,isLoading:false });
    }
}
export function* logoutSaga(action) {
  console.log('out triggres', action);
    try {
        destroyCookie(null, 'token', { path: '/' });
        destroyCookie(null, 'userId', { path: '/' });
        yield put({ type: LOGOUT_SUCCESS });
        yield put({ type: 'RESET_STORE' });
    } catch (error) {
        yield put({ type: LOGOUT_FAILURE, error: error.message });
    }
}


export function* updateUserSaga(action) {
  try {
      yield put({ type: SET_LOADING, isLoading: true });
      const cookies = parseCookies();
      const { token, userId } = cookies;
      const requestData = { url: updateUserEndpoint(userId) , payload: {...action.payload}, isMethod: 'PUT' };
      const response = yield call(axios.post, handlerEndpoint , requestData);
      
      if (response.data) {
          yield put({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
      } else {
          yield put({ type: 'UPDATE_USER_FAILURE', error: response.error });
      }
      yield put({ type: SET_LOADING, isLoading: false });
  } catch (error) {
      console.error('Update user error:', error.response);
      yield put({ type: 'SET_ERROR', payload: error?.response?.data?.message?.[0] || "Unknown error" });
      yield put({ type: SET_LOADING, isLoading: false });
  }
}

export function* getUserSaga(action) {
  try {
      yield put({ type: SET_LOADING, isLoading: true });
      const { userId } = action.payload;
      const requestData = { url: getUserEndpoint(userId) , payload: {} , isMethod: 'GET' };
      const response = yield call(axios.post, handlerEndpoint , requestData);
      
      if (response.data) {
          yield put({ type: 'GET_USER_SUCCESS', payload: response.data });
      } else {
          yield put({ type: 'GET_USER_FAILURE', error: response.error });
      }
      yield put({ type: SET_LOADING, isLoading: false });
  } catch (error) {
      console.error('Get user error:', error.response);
      yield put({ type: 'SET_ERROR', payload: error?.response?.data?.message?.[0] || "Unknown error" });
      yield put({ type: SET_LOADING, isLoading: false });
  }
}

export default function* watchAuthSagas() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(VALIDATE_TOKEN_REQUEST, validateTokenAndGetUserSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(GET_USER_REQUEST, getUserSaga);
}