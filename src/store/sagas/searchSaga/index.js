import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
    SEARCH_USER_ITEM_REQUEST, 
    SEARCH_USER_ITEM_SUCCESS, 
    SEARCH_USER_ITEM_FAILURE, 
    SEARCH_ALL_CLOTHING_ITEMS_REQUEST, 
    SEARCH_ALL_CLOTHING_ITEMS_SUCCESS, 
    SEARCH_ALL_CLOTHING_ITEMS_FAILURE 
} from 'store/types/apiActionTypes';
import { SET_LOADING, SET_ERROR } from 'store/types/apiActionTypes';
import { handlerEndpoint, searchAllClothingItemsEndpoint, searchUserClothesEndpoint } from 'config/env';

function* searchUserItemSaga(action) {
    try {
        debugger;
        yield put({ type: SET_LOADING, isLoading: true });
        const { userId, itemName, size, page } = action.payload;
        const searchParams = {
            itemName,
            size,
            page
        };
        const requestData = { 
            url: searchUserClothesEndpoint(userId, searchParams),    
            payload: {...action.payload}, 
            isMethod: 'GET' 
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        
        if (response.data) {
            yield put({ type: SEARCH_USER_ITEM_SUCCESS, payload: response.data });
        } else {
            yield put({ type: SEARCH_USER_ITEM_FAILURE, error: response.error });
        }
        yield put({ type: SET_LOADING, isLoading: false });
    } catch (error) {
        console.error('Search user item error:', error.response);
        yield put({ type: SET_ERROR, payload: error?.response?.data?.message?.[0] || "Unknown error" });
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

function* searchAllClothingItemsSaga(action) {
    try {
        yield put({ type: SET_LOADING, isLoading: true });
        const { itemName, size, page } = action.payload.itemType;
        const requestData = { 
            url: searchAllClothingItemsEndpoint(itemName, size?size:10, page), 
            payload:{},
            isMethod: 'GET'
        };
        const response = yield call(axios.post, handlerEndpoint, requestData);
        
        if (response.data) {
            yield put({ type: SEARCH_ALL_CLOTHING_ITEMS_SUCCESS, payload: response.data });
        } else {
            yield put({ type: SEARCH_ALL_CLOTHING_ITEMS_FAILURE, error: response.error });
        }
        yield put({ type: SET_LOADING, isLoading: false });
    } catch (error) {
        console.error('Search all clothing items error:', error.response);
        yield put({ type: SET_ERROR, payload: error?.response?.data?.message?.[0] || "Unknown error" });
        yield put({ type: SET_LOADING, isLoading: false });
    }
}

export default function* watchSearchSagas() {
    yield takeEvery(SEARCH_USER_ITEM_REQUEST, searchUserItemSaga);
    yield takeLatest(SEARCH_ALL_CLOTHING_ITEMS_REQUEST, searchAllClothingItemsSaga);
}