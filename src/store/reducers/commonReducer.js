const initialState = {
    isLoginPopupOpen: false,
    isPopupOpen:false,
    popupInfo:{
        title:null,
        content:null,
        data:null
    },
    error:null,
    info:null,
    pageLoading:false,
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PAGE_LOADING':
            return { ...state, pageLoading: action.payload };
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
