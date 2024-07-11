import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clothingItemsReducer from './clothingItemsReducer';
import { HYDRATE } from 'next-redux-wrapper'


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
      if (action.payload.serverCheck.isServer) {
        return { ...state, ...action.payload }
      }
      return state
    }
    default:
      return state
  }
}

export const combinedReducer = combineReducers({
  auth: authReducer,
  clothingItems: clothingItemsReducer,
});

function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action)
  return hydrate(intermediateState, action)
}
export default rootReducer
