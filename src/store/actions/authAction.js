import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  VALIDATE_TOKEN_REQUEST,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILURE,
  SET_LOADING
} from 'store/types/apiActionTypes';

export const login = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const register = (data) => ({
  type: REGISTER_REQUEST,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const validateTokenRequest = (token, userId) => ({
  type: VALIDATE_TOKEN_REQUEST,
  payload: { token, userId }
});

export const validateTokenSuccess = (user) => ({
  type: VALIDATE_TOKEN_SUCCESS,
  payload: { user, isLoggedIn:true }
});

export const validateTokenFailure = (error) => ({
  type: VALIDATE_TOKEN_FAILURE,
  payload: { error }
});