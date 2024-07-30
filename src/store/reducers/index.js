import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { HYDRATE } from 'next-redux-wrapper'
import commonReducer from './commonReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import tradeReducer from './tradeReducer';
import itemReducer from './itemReducer';


// this is to set a flag for initial server renders
function serverCheck(state = { isServer: false }, action) {
  const { type } = action
  switch (type) {
    case SET_IS_SERVER: {
      return { ...state, isServer: true }
    }
    default:
      return state
  }
}

//We hydrate only if this is the initial server render
function hydrate(state = {}, action) {
  const { type } = action
  switch (type) {
    case HYDRATE: {
      if (action?.payload) {
        return { ...state, ...action.payload }
      }
      return state
    }
    default:
      return state
  }
}

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
    return state;
  }

  return combinedReducer(state, action);
};

export default rootReducer;