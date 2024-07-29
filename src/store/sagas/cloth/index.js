import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { searchUserClothesEndpoint, handlerEndpoint } from 'config/env';
import { parseCookies } from 'nookies';
import { SEARCH_USER_ITEM_FAILURE, SEARCH_USER_ITEM_REQUEST, SEARCH_USER_ITEM_SUCCESS } from 'store/types/apiActionTypes';

function* searchUserItemSaga(action) {
    try {
        const cookies = parseCookies();
        const {itemName, size, page, user } = action.payload;
        const { token, userId } = cookies;
        const userCC = user ?  userId : user;
        const searchParams = `itemName=${itemName}&size=${size}&page=${page}`;
        const url = searchUserClothesEndpoint(userCC, searchParams);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.post, handlerEndpoint, { url, headers, method: 'get'});
        yield put({ type: SEARCH_USER_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: SEARCH_USER_ITEM_FAILURE, error: error.message });
    }
}

export function* watchSearchUserItemSaga() {
    yield takeEvery(SEARCH_USER_ITEM_REQUEST, searchUserItemSaga);
}