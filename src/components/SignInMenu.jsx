import React from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginPopup } from 'store/actions/commonAction';
import Skeleton from './common/Skeleton';

const SignInMenu = ({ setIsSignInMenuOpen }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  if (isLoading) {
    return (
      <div className="absolute bg-ccWhite min-w-max text-justify items-center right-2 top-12 py-4 shadow-xl rounded-xl font-normal leading-8 z-50">
        <div className="px-4 py-2">
          <Skeleton width="100px" height="20px" />
          <Skeleton width="150px" height="15px" />
        </div>
        <div className="px-4 py-2">
          <Skeleton width="120px" height="40px" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bg-ccWhite min-w-max text-justify items-center right-2 top-12 py-4 shadow-xl rounded-xl font-normal leading-8 z-50">
      <div className="px-4 py-2">
        <p className="text-gray-700">Welcome, Guest!</p>
        <p className="text-gray-500 text-sm">Please sign in to access more features.</p>
      </div>
      <div className="px-4 py-2">
        <Button text={"Login/Register"} onClick={() => { dispatch(openLoginPopup()); setIsSignInMenuOpen(false); }} />
      </div>
    </div>
  );
};

export default SignInMenu;