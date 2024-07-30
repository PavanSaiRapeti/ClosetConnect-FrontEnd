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

const initialState = {
    trades: [],
    trade: null,
    loading: false,
    error: null
};

const tradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TRADE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USER_SENT_TRADES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USER_RECEIVED_TRADES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_TRADE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ACCEPT_OR_DECLINE_TRADE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case REQUEST_TRADE_SUCCESS:
            return {
                ...state,
                trades: [...state.trades, action.payload],
                loading: false
            };
        case GET_USER_SENT_TRADES_SUCCESS:
            return {
                ...state,
                trades: action.payload,
                loading: false
            };
        case GET_USER_RECEIVED_TRADES_SUCCESS:
            return {
                ...state,
                trades: action.payload,
                loading: false
            };
        case GET_TRADE_SUCCESS:
            return {
                ...state,
                trade: action.payload,
                loading: false
            };
        case ACCEPT_OR_DECLINE_TRADE_SUCCESS:
            return {
                ...state,
                trades: state.trades.map(trade => trade.id === action.payload.id ? action.payload : trade),
                loading: false
            };
        case REQUEST_TRADE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case GET_USER_SENT_TRADES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case GET_USER_RECEIVED_TRADES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case GET_TRADE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case ACCEPT_OR_DECLINE_TRADE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default tradeReducer;