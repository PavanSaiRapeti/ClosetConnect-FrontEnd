import { SEARCH_USER_ITEM_REQUEST, SEARCH_USER_ITEM_SUCCESS, SEARCH_USER_ITEM_FAILURE } from '../types/apiActionTypes';

export const searchUserItemRequest = (payload) => ({
    type: SEARCH_USER_ITEM_REQUEST,
    payload
});

export const searchUserItemSuccess = (data) => ({
    type: SEARCH_USER_ITEM_SUCCESS,
    payload: data
});

export const searchUserItemFailure = (error) => ({
    type: SEARCH_USER_ITEM_FAILURE,
    error
});