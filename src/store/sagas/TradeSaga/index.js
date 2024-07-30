import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    REQUEST_TRADE_REQUEST,
    REQUEST_TRADE_SUCCESS,
    REQUEST_TRADE_FAILURE,
    GET_USER_SENT_TRADES_REQUEST,
    GET_USER_SENT_TRADES_SUCCESS,
    GET_USER_SENT_TRADES_FAILURE,
    GET_USER_RECEIVED_TRADES_REQUEST,
    GET_USER_RECEIVED_TRADES_SUCCESS,
    GET_USER_RECEIVED_TRADES_FAILURE,
    GET_TRADE_REQUEST,
    GET_TRADE_SUCCESS,
    GET_TRADE_FAILURE,
    ACCEPT_OR_DECLINE_TRADE_REQUEST,
    ACCEPT_OR_DECLINE_TRADE_SUCCESS,
    ACCEPT_OR_DECLINE_TRADE_FAILURE
} from 'store/types/apiActionTypes';
import { SET_LOADING, SET_ERROR } from 'store/types/apiActionTypes';
import { acceptOrDeclineTradeEndpoint, getTradeEndpoint, getUserReceivedTradesEndpoint, getUserSentTradesEndpoint, handlerEndpoint, requestTradeEndpoint } from 'config/env';

function* requestTradeSaga(action) {
    yield put({ type: SET_LOADING, isLoading: true });
    try {
        const requestData = { 
            url: requestTradeEndpoint, 
            payload: action.payload, 
            isMethod: 'POST' 
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: REQUEST_TRADE_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Request trade error:', error.response);
        yield put({ type: REQUEST_TRADE_FAILURE, error: error.response.data });
        yield put({ type: SET_ERROR, payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* getUserSentTradesSaga(action) {
    yield put({ type: SET_LOADING, isLoading: true });
    try {
        const { userId, page } = action.payload;
        const requestData = { 
            url: getUserSentTradesEndpoint(userId, page), 
            payload: {}, 
            isMethod: 'GET', 
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: GET_USER_SENT_TRADES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Get user sent trades error:', error.response);
        yield put({ type: GET_USER_SENT_TRADES_FAILURE, error: error.response.data });
        yield put({ type: SET_ERROR, payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* getUserReceivedTradesSaga(action) {
    yield put({ type: SET_LOADING, isLoading: true });
    try {
        const { userId, page } = action.payload;
        const requestData = { 
            url: getUserReceivedTradesEndpoint(userId, page), 
            payload: {}, 
            isMethod: 'GET' 
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: GET_USER_RECEIVED_TRADES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Get user received trades error:', error.response);
        yield put({ type: GET_USER_RECEIVED_TRADES_FAILURE, error: error.response.data });
        yield put({ type: SET_ERROR, payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* getTradeSaga(action) {
    yield put({ type: SET_LOADING, isLoading: true });
    try {
        const requestData = { 
            url: getTradeEndpoint(action.payload), 
            payload: {}, 
            isMethod: 'GET' 
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: GET_TRADE_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Get trade error:', error.response);
        yield put({ type: GET_TRADE_FAILURE, error: error.response.data });
        yield put({ type: SET_ERROR, payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* acceptOrDeclineTradeSaga(action) {
    yield put({ type: SET_LOADING, isLoading: true });
    try {
        const { tradeId, userId, status, reason } = action.payload;
        const requestData = { 
            url: acceptOrDeclineTradeEndpoint(tradeId, userId), 
            payload: { status, reason }, 
            isMethod: 'PUT' 
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: ACCEPT_OR_DECLINE_TRADE_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Accept or decline trade error:', error.response);
        yield put({ type: ACCEPT_OR_DECLINE_TRADE_FAILURE, error: error.response.data });
        yield put({ type: SET_ERROR, payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

export default function* watchTradeSagas() {
    yield takeEvery(REQUEST_TRADE_REQUEST, requestTradeSaga);
    yield takeEvery(GET_USER_SENT_TRADES_REQUEST, getUserSentTradesSaga);
    yield takeEvery(GET_USER_RECEIVED_TRADES_REQUEST, getUserReceivedTradesSaga);
    yield takeEvery(GET_TRADE_REQUEST, getTradeSaga);
    yield takeEvery(ACCEPT_OR_DECLINE_TRADE_REQUEST, acceptOrDeclineTradeSaga);
}