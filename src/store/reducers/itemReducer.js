import { HYDRATE } from 'next-redux-wrapper';
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
    GET_ALL_CLOTHING_ITEMS_SUCCESS} from 'store/types/apiActionTypes';

const initialState = {
    items: [],
    item: null,
    loading: false,
    error: null
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload.item,
            };
        case CREATE_CLOTHING_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_CLOTHING_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_CLOTHING_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_CLOTHING_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USER_CLOTHING_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_ALL_CLOTHING_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_CLOTHING_ITEM_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false
            };
        case UPDATE_CLOTHING_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload.id ? action.payload : item),
                loading: false
            };
        case DELETE_CLOTHING_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                loading: false
            };
        case GET_CLOTHING_ITEM_SUCCESS:
            return {
                ...state,
                item: action.payload,
                loading: false
            };
        case GET_USER_CLOTHING_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case GET_ALL_CLOTHING_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case CREATE_CLOTHING_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case UPDATE_CLOTHING_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case DELETE_CLOTHING_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case GET_CLOTHING_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case GET_USER_CLOTHING_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default itemReducer;