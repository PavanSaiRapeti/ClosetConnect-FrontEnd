import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { logout} from 'store/actions/authAction';
import { useRouter } from 'next/router';

const SignedInMenu = ({ setIsSignedInMenuOpen, userName }) => {
  const dispatch = useDispatch();
  const router=useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/home');
    setIsSignedInMenuOpen(false);
    
  };

  return (
    <div className="absolute bg-ccWhite min-w-max text-justify items-center right-2 top-12 py-4 shadow-xl rounded-xl font-normal leading-8 z-50">
      <div className="px-4 py-2">
        <p className="text-gray-700">Welcome, {userName}!</p>
        <p className="text-gray-500 text-sm">You are signed in.</p>
      </div>
      <div className="px-4 py-2">
        <Button text={"Logout"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default SignedInMenu;