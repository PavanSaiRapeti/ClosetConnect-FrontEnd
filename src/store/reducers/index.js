import { combineReducers } from 'redux';
import { HYDRATE, SET_ERROR } from 'store/types/apiActionTypes';
import authReducer from './authReducer';
import commonReducer from './commonReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import tradeReducer from './tradeReducer';
import itemReducer from './itemReducer';

// Combine all reducers
const combinedReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  search: searchReducer,
  user: userReducer,
  trade: tradeReducer,
  item: itemReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  } else if (action.type === 'RESET_STORE') {
    state = undefined; // Reset the state
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;