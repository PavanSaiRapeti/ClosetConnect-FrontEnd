const initialState = {
    isLoginPopupOpen: false,
    isPopupOpen:false,
    popupInfo:{
        title:null,
        content:null,
        data:null
    },
    error:null,
    info:null
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            console.log('Rehydrated state:', action.payload);
            return {
              ...state,
              ...action.payload?.common,
            };
        case 'SET_INFO':
            return { ...state, info: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'LOGIN_POPUP_OPEN':
            return { ...state, isLoginPopupOpen: true };
        case 'LOGIN_POPUP_ClOSE':
            return { ...state, isLoginPopupOpen: false };
        case 'SET_POPUP':
            return {...state, popupInfo: action.payload };
        case 'OPEN_POPUP':
            return { ...state, isPopupOpen: true };
        case 'CLOSE_POPUP':
            return { ...state, isPopupOpen: false ,  popupInfo: { title:null, content: null },
                error:null};
        default:
            return state;
    }
};

export default commonReducer;
