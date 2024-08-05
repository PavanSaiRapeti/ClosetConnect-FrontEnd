import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  VALIDATE_TOKEN_FAILURE,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_REQUEST,
  SET_LOADING,
  LOGIN_FAILURE,
  HYDRATE
} from 'store/types/apiActionTypes';

const initialState = {
  token: null,
  isLoggedIn: false,
  id: null,
  user: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token, id: action.payload.id };
    case 'LOGIN_SET_ERROR':
      return { ...state, error: action.payload };
    case REGISTER_SUCCESS:
      return { ...state, token: action.payload };
    case LOGOUT_REQUEST:
      return { ...state, token: null, user: null, id: null, isLoggedIn: false };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoggedIn: false,
        token: null,
        id: null,
        user: null
      };
    case VALIDATE_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
        loading: false,
        error: null
      };
    case VALIDATE_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case HYDRATE:
      return {
        ...state,
        ...action.payload.auth
      };
    default:
      return state;
  }
};

export default authReducer;