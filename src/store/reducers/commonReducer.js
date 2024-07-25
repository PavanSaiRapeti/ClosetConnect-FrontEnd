const initialState = {
    isLoginPopupOpen: false,
    isPopupOpen:false,
    popupInfo:{
        title:'',
        content:'',
    }
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            console.log('Rehydrated state:', action.payload);
            return {
              ...state,
              ...action.payload?.common,
            };
        case 'LOGIN_POPUP_OPEN':
            return { ...state, isLoginPopupOpen: true };
        case 'LOGIN_POPUP_ClOSE':
            return { ...state, isLoginPopupOpen: false };
        case 'SET_POPUP':
            return {...state, popupInfo: action.payload };
        case 'OPEN_POPUP':
            return { ...state, isPopupOpen: true };
        case 'CLOSE_POPUP':
            return { ...state, isPopupOpen: false };
        default:
            return state;
    }
};

export default commonReducer;
