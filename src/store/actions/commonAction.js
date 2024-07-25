export const closeLoginPopup = () => ({
    type: 'LOGIN_POPUP_ClOSE',
});
export const openLoginPopup = () => ({
    type: 'LOGIN_POPUP_OPEN',
});

export const setPopup = ({title,content}) => ({
    type: 'SET_POPUP',
    payload: {title,content},
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
