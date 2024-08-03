import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, SET_USER_ID } from "store/types/apiActionTypes";

const initialState = {
  userId: null,
  user: null,
  loading: false,
  error: null,
  token: null,
  notification: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        ...action.payload.user,
      };
    case 'HYDRATE_USER':
      return {
        ...state,
        userId: null,
        user: null,
        loading: false,
        error: null,
        token: null,
        notification: [],
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;