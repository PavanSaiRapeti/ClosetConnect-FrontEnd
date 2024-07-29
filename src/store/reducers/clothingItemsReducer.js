import { SEARCH_USER_ITEM_FAILURE, SEARCH_USER_ITEM_REQUEST, SEARCH_USER_ITEM_SUCCESS } from "store/types/apiActionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null
  };

const clothingItemsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_USER_ITEM_REQUEST:
        return { ...state, loading: true, error: null };
    case SEARCH_USER_ITEM_SUCCESS:
        return { ...state, loading: false, data: action.payload };
    case SEARCH_USER_ITEM_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };

export default clothingItemsReducer;