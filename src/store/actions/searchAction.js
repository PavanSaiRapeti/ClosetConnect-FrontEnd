import {
    SEARCH_USER_ITEM_REQUEST,
    SEARCH_USER_ITEM_SUCCESS,
    SEARCH_USER_ITEM_FAILURE,
    SEARCH_ALL_CLOTHING_ITEMS_REQUEST,
    SEARCH_ALL_CLOTHING_ITEMS_SUCCESS,
    SEARCH_ALL_CLOTHING_ITEMS_FAILURE
} from 'store/types/apiActionTypes';

// Action to initiate search for user-specific clothing items
export const searchUserItemRequest = (userId, itemName, size, page) => ({
    type: SEARCH_USER_ITEM_REQUEST,
    payload: { userId, itemName, size, page }
});

export const searchUserItemSuccess = (data) => ({
    type: SEARCH_USER_ITEM_SUCCESS,
    payload: data
});

export const searchUserItemFailure = (error) => ({
    type: SEARCH_USER_ITEM_FAILURE,
    error
});

// Action to initiate search for all clothing items
export const searchAllClothingItemsRequest = (itemType, size, page) => ({
    type: SEARCH_ALL_CLOTHING_ITEMS_REQUEST,
    payload: { itemType, size, page }
});

export const searchAllClothingItemsSuccess = (data) => ({
    type: SEARCH_ALL_CLOTHING_ITEMS_SUCCESS,
    payload: data
});

export const searchAllClothingItemsFailure = (error) => ({
    type: SEARCH_ALL_CLOTHING_ITEMS_FAILURE,
    error
});