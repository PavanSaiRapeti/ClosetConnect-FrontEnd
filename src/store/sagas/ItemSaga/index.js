import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    CREATE_CLOTHING_ITEM_REQUEST,
    CREATE_CLOTHING_ITEM_SUCCESS,
    CREATE_CLOTHING_ITEM_FAILURE,
    UPDATE_CLOTHING_ITEM_REQUEST,
    UPDATE_CLOTHING_ITEM_SUCCESS,
    UPDATE_CLOTHING_ITEM_FAILURE,
    DELETE_CLOTHING_ITEM_REQUEST,
    DELETE_CLOTHING_ITEM_SUCCESS,
    DELETE_CLOTHING_ITEM_FAILURE,
    GET_CLOTHING_ITEM_REQUEST,
    GET_CLOTHING_ITEM_SUCCESS,
    GET_CLOTHING_ITEM_FAILURE,
    GET_USER_CLOTHING_ITEMS_REQUEST,
    GET_USER_CLOTHING_ITEMS_SUCCESS,
    GET_USER_CLOTHING_ITEMS_FAILURE,
    GET_ALL_CLOTHING_ITEMS_REQUEST,
    GET_ALL_CLOTHING_ITEMS_SUCCESS,
    GET_ALL_CLOTHING_ITEMS_FAILURE
} from 'store/types/apiActionTypes';
import { SET_LOADING } from 'store/types/apiActionTypes';
import { getUserItemsEndpoint, getAllItemsEndpoint,   handlerEndpoint, createUserItemEndpoint, updateItemEndpoint, deleteItemEndpoint, getItemEndpoint } from 'config/env';
import { parseCookies } from 'nookies';

function* createClothingItemSaga(action) {
    try {
        const cookies = parseCookies();
        const { token, userId } = cookies;
        yield put({ type: SET_LOADING, isLoading: true });
        const requestData = { url: createUserItemEndpoint(userId), payload: action.payload, isMethod: 'POST' , headers:{
            'Authorization': `Bearer ${token}`
            }};
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: CREATE_CLOTHING_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Create clothing item error:', error.response);
        yield put({ type: CREATE_CLOTHING_ITEM_FAILURE, error: error.response.data });
        yield put({ type: 'SET_ERROR', payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* updateClothingItemSaga(action) {
    try {
        yield put({ type: SET_LOADING, isLoading: true });
        const { itemId, itemData } = action.payload;
        const cookies = parseCookies();
        const { token, userId} = cookies;
        const requestData = { url: updateItemEndpoint(itemId,userId), payload: itemData, isMethod: 'PUT', headers:{
            'Authorization': `Bearer ${token}`
            }};
        const response = yield call(axios.post, handlerEndpoint, requestData);
        console.log('===>updateResponse', response);
        yield put({ type: UPDATE_CLOTHING_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Update clothing item error:', error?.response);
        yield put({ type: UPDATE_CLOTHING_ITEM_FAILURE, error: error?.response?.data });
        yield put({ type: "SET_ERROR", payload: error?.response?.data?.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* deleteClothingItemSaga(action) {
    try {
        yield put({ type: SET_LOADING, isLoading: true });
        const requestData = { url: deleteItemEndpoint(action.payload, action.userId), payload: {}, isMethod: 'DELETE' };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: DELETE_CLOTHING_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Delete clothing item error:', error.response);
        yield put({ type: DELETE_CLOTHING_ITEM_FAILURE, error: error.response.data });
        yield put({ type: 'SET_ERROR', payload: error.response.data.message || "Unknown error" });
    } finally {
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* getClothingItemSaga(action) {
    try {
        yield put({ type: SET_LOADING, isLoading: true });
        const { itemId } = action.payload;
        const requestData = { url: getItemEndpoint(itemId), payload: {}, isMethod: 'GET' };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: GET_CLOTHING_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Get clothing item error:', error.response);
        yield put({ type: GET_CLOTHING_ITEM_FAILURE, error: error.response.data });
        yield put({ type: "SET_ERROR", payload: error.response.data.message || "Unknown error" });
    } 
}

function* getUserClothingItemsSaga(action) {
    try {
        yield put({ type: SET_LOADING, isLoading: true });
        const { userId, size, page } = action.payload;
        const cookies = parseCookies();
        const { token} = cookies;
        const requestData = { url: getUserItemsEndpoint(userId, size, page), payload: {}, headers:{
            'Authorization': `Bearer ${token}`
            }, isMethod: 'GET' };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: GET_USER_CLOTHING_ITEMS_SUCCESS, payload: response.data });
        yield put({ type: 'SET_PAGE_LOADING', pageLoading: false });
    } catch (error) {
        console.error('Get user clothing items error:', error.response);
        yield put({ type: GET_USER_CLOTHING_ITEMS_FAILURE, error: error.response.data });
        yield put({ type: "SET_ERROR", payload: error.response.data.message || "Unknown error" });
    } 
}

function* getAllClothingItemsSaga(action) {
    try {
        yield put({ type: SET_LOADING, isLoading: true });
        const { size, page } = action.payload;
        const requestData = {
            url: getAllItemsEndpoint(size, page),
            payload: {},
            isMethod: 'GET'
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        yield put({ type: GET_ALL_CLOTHING_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Get all clothing items error:', error.response);
        yield put({ type: GET_ALL_CLOTHING_ITEMS_FAILURE, error: error.response.data });
        yield put({ type: SET_ERROR, payload: error.response.data.message || "Unknown error" });
    } 
}

export default function* watchItemSagas() {
    yield takeEvery(CREATE_CLOTHING_ITEM_REQUEST, createClothingItemSaga);
    yield takeEvery(UPDATE_CLOTHING_ITEM_REQUEST, updateClothingItemSaga);
    yield takeEvery(DELETE_CLOTHING_ITEM_REQUEST, deleteClothingItemSaga);
    yield takeEvery(GET_CLOTHING_ITEM_REQUEST, getClothingItemSaga);
    yield takeEvery(GET_USER_CLOTHING_ITEMS_REQUEST, getUserClothingItemsSaga);
    yield takeEvery(GET_ALL_CLOTHING_ITEMS_REQUEST, getAllClothingItemsSaga);
}