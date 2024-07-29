import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, SEARCH_USER_CLOTHES_REQUEST, SEARCH_USER_CLOTHES_SUCCESS, SEARCH_USER_CLOTHES_FAILURE, CREATE_USER_ITEM_REQUEST, CREATE_USER_ITEM_SUCCESS, CREATE_USER_ITEM_FAILURE, UPDATE_USER_ITEM_REQUEST, UPDATE_USER_ITEM_SUCCESS, UPDATE_USER_ITEM_FAILURE, DELETE_USER_ITEM_REQUEST, DELETE_USER_ITEM_SUCCESS, DELETE_USER_ITEM_FAILURE, GET_USER_ITEMS_REQUEST, GET_USER_ITEMS_SUCCESS, GET_USER_ITEMS_FAILURE, GET_ALL_ITEMS_REQUEST, GET_ALL_ITEMS_SUCCESS, GET_ALL_ITEMS_FAILURE, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE, GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_FAILURE, UPLOAD_ITEM_IMAGE_REQUEST, UPLOAD_ITEM_IMAGE_SUCCESS, UPLOAD_ITEM_IMAGE_FAILURE, GET_USER_CLOTHES_REQUEST, GET_USER_CLOTHES_SUCCESS, GET_USER_CLOTHES_FAILURE, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE, GET_ITEM_IMAGE_REQUEST, GET_ITEM_IMAGE_SUCCESS, GET_ITEM_IMAGE_FAILURE } from '../types/apiActionTypes';

export const getUserRequest = (userId) => ({
    type: GET_USER_REQUEST,
    payload: { userId },
});

export const updateUserRequest = (userId, data) => ({
    type: UPDATE_USER_REQUEST,
    payload: { userId, data },
});

export const searchUserClothesRequest = (userId, searchParam) => ({
    type: SEARCH_USER_CLOTHES_REQUEST,
    payload: { userId, searchParam },
});

export const createUserItemRequest = (userId, data) => ({
    type: CREATE_USER_ITEM_REQUEST,
    payload: { userId, data },
});

export const updateUserItemRequest = (userId, itemId, data) => ({
    type: UPDATE_USER_ITEM_REQUEST,
    payload: { userId, itemId, data },
});

export const deleteUserItemRequest = (userId, itemId) => ({
    type: DELETE_USER_ITEM_REQUEST,
    payload: { userId, itemId },
});

export const getUserItemsRequest = (userId, size, page) => ({
    type: GET_USER_ITEMS_REQUEST,
    payload: { userId, size, page },
});

export const getAllItemsRequest = (size, page) => ({
    type: GET_ALL_ITEMS_REQUEST,
    payload: { size, page },
});

export const deleteItemRequest = (itemId, userId) => ({
    type: DELETE_ITEM_REQUEST,
    payload: { itemId, userId },
});

export const getItemRequest = (itemId) => ({
    type: GET_ITEM_REQUEST,
    payload: { itemId },
});

export const uploadItemImageRequest = (itemId, formData) => ({
    type: UPLOAD_ITEM_IMAGE_REQUEST,
    payload: { itemId, formData },
});

export const getUserClothesRequest = (userId, itemName, size, page) => ({
    type: GET_USER_CLOTHES_REQUEST,
    payload: { userId, itemName, size, page },
});

export const updateItemRequest = (itemId, userId, data) => ({
    type: UPDATE_ITEM_REQUEST,
    payload: { itemId, userId, data },
});

export const getItemImageRequest = (itemId) => ({
    type: GET_ITEM_IMAGE_REQUEST,
    payload: { itemId },
});