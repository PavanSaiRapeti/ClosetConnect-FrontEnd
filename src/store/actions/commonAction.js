export const closeLoginPopup = () => ({
    type: 'LOGIN_POPUP_ClOSE',
});
export const openLoginPopup = () => ({
    type: 'LOGIN_POPUP_OPEN',
});

export const setPopup = ({title,content,data=''}) => ({
    type: 'SET_POPUP',
    payload: {title,content,data},
});
export const openPopup = () => ({
    type: 'OPEN_POPUP',
});

export const closePopup = () => ({
    type: 'CLOSE_POPUP',
    payload:{
        content:null,
        error:null
    }
});
export const setPageLoading = (isLoading) => ({
    type: 'SET_PAGE_LOADING',
    payload: isLoading,
});
