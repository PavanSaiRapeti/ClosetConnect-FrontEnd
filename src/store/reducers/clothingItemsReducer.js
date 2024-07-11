const initialState = {
    token: null,
    error: null,
  };

const clothingItemsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, token: action.payload };
      case 'REGISTER_SUCCESS':
        return { ...state, token: action.payload };
      case 'LOGOUT':
        return { ...state, token: null };
      default:
        return state;
    }
  };

export default clothingItemsReducer;