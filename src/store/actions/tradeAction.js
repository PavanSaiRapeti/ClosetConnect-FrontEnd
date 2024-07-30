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

// Request Trade
export const requestTradeRequest = (tradeData) => ({
    type: REQUEST_TRADE_REQUEST,
    payload: tradeData
});

export const requestTradeSuccess = (data) => ({
    type: REQUEST_TRADE_SUCCESS,
    payload: data
});

export const requestTradeFailure = (error) => ({
    type: REQUEST_TRADE_FAILURE,
    error
});

// Get User Sent Trades
export const getUserSentTradesRequest = (userId, page) => ({
    type: GET_USER_SENT_TRADES_REQUEST,
    payload: { userId, page }
});

export const getUserSentTradesSuccess = (data) => ({
    type: GET_USER_SENT_TRADES_SUCCESS,
    payload: data
});

export const getUserSentTradesFailure = (error) => ({
    type: GET_USER_SENT_TRADES_FAILURE,
    error
});

// Get User Received Trades
export const getUserReceivedTradesRequest = (userId, page) => ({
    type: GET_USER_RECEIVED_TRADES_REQUEST,
    payload: { userId, page }
});

export const getUserReceivedTradesSuccess = (data) => ({
    type: GET_USER_RECEIVED_TRADES_SUCCESS,
    payload: data
});

export const getUserReceivedTradesFailure = (error) => ({
    type: GET_USER_RECEIVED_TRADES_FAILURE,
    error
});

// Get Trade
export const getTradeRequest = (tradeId) => ({
    type: GET_TRADE_REQUEST,
    payload: tradeId
});

export const getTradeSuccess = (data) => ({
    type: GET_TRADE_SUCCESS,
    payload: data
});

export const getTradeFailure = (error) => ({
    type: GET_TRADE_FAILURE,
    error
});

// Accept or Decline Trade
export const acceptOrDeclineTradeRequest = (tradeId, userId, status, reason) => ({
    type: ACCEPT_OR_DECLINE_TRADE_REQUEST,
    payload: { tradeId, userId, status, reason }
});

export const acceptOrDeclineTradeSuccess = (data) => ({
    type: ACCEPT_OR_DECLINE_TRADE_SUCCESS,
    payload: data
});

export const acceptOrDeclineTradeFailure = (error) => ({
    type: ACCEPT_OR_DECLINE_TRADE_FAILURE,
    error
});