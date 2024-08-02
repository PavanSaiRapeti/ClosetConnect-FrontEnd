import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignInMenu from './SignInMenu';

const IconView = ({notifications}) => { 
  const router = useRouter();
  const [isSignInMenuOpen, setIsSignInMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const user = useSelector(state => state.auth.user); 
   // Assuming notifications are stored in state.notifications.items
  // const notifications = ['Notification 1', 'Notification 2', 'Notification 3'];
  
  useEffect(() => {
    if (notifications.length > 0 && !hasNewNotifications) {
      setHasNewNotifications(true);
    }
  }, [notifications, hasNewNotifications]);

  const handleProfileClick = () => {
    setIsSignInMenuOpen(!isSignInMenuOpen);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsSignInMenuOpen(false);
    setHasNewNotifications(false);
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
          <button className="inline-block text-ccBlack rounded-sm hover:border-primary-accent-1" onClick={handleNotificationsClick}>  
            <i className="w-full text-center fas fa-bell text-xl leading-6 relative">
              {hasNewNotifications && (
                <span className="absolute top-0 right-4 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </i>
            <span className="text-xs block">Notifications</span>
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul className="p-2">
                {notifications.length>0 ?
                  notifications.map((notification, index) => (
                    <li key={index} onClick={() => router.push(`/tradeid/${notification.tradeId}`)} className={`p-2 border-b border-gray-200 last:border-0 ${notification.notificationStatus? 'bg-green-100' :  'bg-red-100'} cursor-pointer`}>
                      {notification.message}
                    </li>
                  ))
                :
                  <li className="p-2">No notifications</li>
                }
              </ul>
            </div>
          )}
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


