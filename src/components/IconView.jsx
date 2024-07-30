import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignInMenu from './SignInMenu';

const IconView = () => { 
  const router = useRouter();
  const [isSignInMenuOpen, setIsSignInMenuOpen] = useState(false);
  const user = useSelector(state => state.auth.user); 
  // const notifications = useSelector(state => state.notifications.items); // Assuming notifications are stored in state.notifications.items
  const notifications = ['adsfdsd'];
  const handleProfileClick = () => {
    setIsSignInMenuOpen(!isSignInMenuOpen);
  };

  return (  
    <ul className="flex space-x-2 items-center">  
      <li className="relative list-none">  
        <button className="focus:outline-none cursor-pointer" onClick={() => router.push('/help')}>  
          <div className="text-center inline-block w-10 text-ccBlack rounded-sm">  
            <i className="fas fa-question-circle text-xl leading-6"></i>
            <span className="text-xs block">Help</span>
          </div>  
        </button>  
      </li>  

      {user && (
        <li className="relative list-none text-right">  
          <a className="inline-block text-ccBlack rounded-sm hover:border-primary-accent-1" href="/notifications">  
            <i className="w-full text-center fas fa-bell text-xl leading-6 relative">
              {notifications.length > 0 && (
                <span className="absolute top-0 right-4 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </i>
            <span className="text-xs block">Notifications</span>
          </a>  
        </li>
      )}

      <li className="sign-in-icon relative list-none">  
        <button onClick={handleProfileClick} className="focus:outline-none cursor-pointer hidden md:block">  
          <div className="text-center inline-block w-10 text-ccBlack rounded-sm">  
            <i className="fas fa-user-circle text-xl text-center leading-6"></i> 
            <span className="text-xs block">Profile</span>
          </div>  
        </button>
        {isSignInMenuOpen && (
          user ? (
            <SignedInMenu setIsSignedInMenuOpen={setIsSignInMenuOpen} userName={user ? user.name : 'Guest'} />
          ) : (
            <SignInMenu setIsSignInMenuOpen={setIsSignInMenuOpen} />
          )
        )}
      </li>  
    </ul>  
  );  
};  

export default IconView;