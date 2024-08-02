import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, SET_USER_ID } from "store/types/apiActionTypes";

export const updateUserRequest = (user) => ({
    type: UPDATE_USER_REQUEST,
    payload: user
  });
  export const setNotification = (notification) => ({
    type: 'SET_NOTIFICATION',
    payload: notification
  });
  export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId
  });
  export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token
  });
  
  export const updateUserSuccess = (response) => ({
    type: UPDATE_USER_SUCCESS,
    payload: response
  });
  
  export const updateUserFailure = (error) => ({
    type: UPDATE_USER_FAILURE,
    payload: error
  });
  
  // Get User Actions
  export const getUserRequest = (userId) => ({
    type: GET_USER_REQUEST,
    payload: userId
  });
  
  export const getUserSuccess = (response) => ({
    type: GET_USER_SUCCESS,
    payload: response
  });
  
  export const getUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    payload: error
  });