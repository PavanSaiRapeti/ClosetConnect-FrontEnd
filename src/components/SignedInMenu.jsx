import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/actions/authAction';
import { useRouter } from 'next/router';
import Skeleton from './common/Skeleton';

const SignedInMenu = ({ setIsSignedInMenuOpen, userName }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.auth.loading);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/home');
    setIsSignedInMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="absolute bg-white min-w-max text-center items-center right-2 top-12 py-6 shadow-2xl rounded-2xl font-medium leading-8 z-50 border border-gray-200">
        <div className="px-6 py-4">
          <Skeleton width="150px" height="20px" />
          <Skeleton width="200px" height="15px" />
        </div>
        <div className="px-6 py-4">
          <Skeleton width="100px" height="40px" />
          <Skeleton width="100px" height="40px" />
          <Skeleton width="100px" height="40px" />
          <Skeleton width="100px" height="40px" />
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Skeleton width="100px" height="40px" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bg-white min-w-max text-center items-center right-2 top-12 py-6 shadow-2xl rounded-2xl font-medium leading-8 z-50 border border-gray-200">
      <div className="px-6 py-4">
        <p className="text-gray-800 text-lg font-semibold">Welcome, {userName}!</p>
        <p className="text-gray-500 text-sm mb-4">You are signed in.</p>
        <ul className="list-none p-0">
          <li className="mb-2">
            <a 
              href="#" 
              onClick={() => router.push('/home')} 
              className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
              Home
            </a>
          </li>
          <li className="mb-2">
            <a 
              href="#" 
              onClick={() => router.push('/profile')} 
              className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
              Profile
            </a>
          </li>
        </ul>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <ul className="list-none p-0">
          <li>
            <a 
              href="#" 
              onClick={handleLogout} 
              className="block w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignedInMenu;