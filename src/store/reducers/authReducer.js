import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  VALIDATE_TOKEN_FAILURE,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_REQUEST,
  SET_LOADING
} from 'store/types/apiActionTypes';

const initialState = {
  token: null,
  error: null,
  isLoggedIn: false,
  id: null,
  user: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token, id: action.payload.id };
    case REGISTER_SUCCESS:
      return { ...state, token: action.payload };
    case LOGOUT_REQUEST:
      return { ...state, token: null,user:null,id:null,isLoggedIn:false };
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
    default:
      return state;
  }
};

export default authReducer;