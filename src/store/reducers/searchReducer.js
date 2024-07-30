import {
    SEARCH_USER_ITEM_REQUEST,
    SEARCH_USER_ITEM_SUCCESS,
    SEARCH_USER_ITEM_FAILURE,
    SEARCH_ALL_CLOTHING_ITEMS_REQUEST,
    SEARCH_ALL_CLOTHING_ITEMS_SUCCESS,
    SEARCH_ALL_CLOTHING_ITEMS_FAILURE
} from 'store/types/apiActionTypes';

const initialState = {
    userItems: [],
    allItems: [],
    loading: false,
    error: null
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_USER_ITEM_REQUEST:
        return {
            ...state,
            payload: action.payload,
            loading: true,
            error: null
        };
        case SEARCH_ALL_CLOTHING_ITEMS_REQUEST:
            return {
                ...state,
                payload: action.payload,
                loading: true,
                error: null
            };
        case SEARCH_USER_ITEM_SUCCESS:
            return {
                ...state,
                userItems: action.payload,
                loading: false
            };
        case SEARCH_ALL_CLOTHING_ITEMS_SUCCESS:
            return {
                ...state,
                allItems: action.payload,
                loading: false
            };
        case SEARCH_USER_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SEARCH_ALL_CLOTHING_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default searchReducer;