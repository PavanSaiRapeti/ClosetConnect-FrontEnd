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

// Create Clothing Item
export const createClothingItemRequest = (itemData) => ({
    type: CREATE_CLOTHING_ITEM_REQUEST,
    payload: itemData
});

export const createClothingItemSuccess = (data) => ({
    type: CREATE_CLOTHING_ITEM_SUCCESS,
    payload: data
});

export const createClothingItemFailure = (error) => ({
    type: CREATE_CLOTHING_ITEM_FAILURE,
    error
});

// Update Clothing Item
export const updateClothingItemRequest = (itemId, itemData) => ({
    type: UPDATE_CLOTHING_ITEM_REQUEST,
    payload: { itemId, itemData }
});

export const updateClothingItemSuccess = (data) => ({
    type: UPDATE_CLOTHING_ITEM_SUCCESS,
    payload: data
});

export const updateClothingItemFailure = (error) => ({
    type: UPDATE_CLOTHING_ITEM_FAILURE,
    error
});

// Delete Clothing Item
export const deleteClothingItemRequest = (itemId) => ({
    type: DELETE_CLOTHING_ITEM_REQUEST,
    payload: itemId
});

export const deleteClothingItemSuccess = (data) => ({
    type: DELETE_CLOTHING_ITEM_SUCCESS,
    payload: data
});

export const deleteClothingItemFailure = (error) => ({
    type: DELETE_CLOTHING_ITEM_FAILURE,
    error
});

// Get Clothing Item
export const getClothingItemRequest = (itemId) => ({
    type: GET_CLOTHING_ITEM_REQUEST,
    payload: itemId
});

export const getClothingItemSuccess = (data) => ({
    type: GET_CLOTHING_ITEM_SUCCESS,
    payload: data
});

export const getClothingItemFailure = (error) => ({
    type: GET_CLOTHING_ITEM_FAILURE,
    error
});

// Get User Clothing Items
export const getUserClothingItemsRequest = (userId, size, page) => ({
    type: GET_USER_CLOTHING_ITEMS_REQUEST,
    payload: { userId, size, page }
});

export const getUserClothingItemsSuccess = (data) => ({
    type: GET_USER_CLOTHING_ITEMS_SUCCESS,
    payload: data
});

export const getUserClothingItemsFailure = (error) => ({
    type: GET_USER_CLOTHING_ITEMS_FAILURE,
    error
});

// Get All Clothing Items
export const getAllClothingItemsRequest = (size, page) => ({
    type: GET_ALL_CLOTHING_ITEMS_REQUEST,
    payload: { size, page }
});

export const getAllClothingItemsSuccess = (data) => ({
    type: GET_ALL_CLOTHING_ITEMS_SUCCESS,
    payload: data
});

export const getAllClothingItemsFailure = (error) => ({
    type: GET_ALL_CLOTHING_ITEMS_FAILURE,
    error
});