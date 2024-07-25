import {  openLoginPopup, openPopup } from 'store/actions/commonAction';

export const handleTrigger = (isLoggedIn, dispatch,action) => {
  if (isLoggedIn) {
    dispatch(action);
    dispatch(openPopup());
  } else {
    dispatch(openLoginPopup());
  }
};