import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignInMenu from './SignInMenu';
import { handleTrigger, markNotificationAsRead } from 'utils/utils';
import { setPopup } from 'store/actions/commonAction';

const IconView = ({notifications}) => { 
  const router = useRouter();
  const dispatch=useDispatch()
  const [isSignInMenuOpen, setIsSignInMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState(5);
  const user = useSelector(state => state.auth.user); 
  
  useEffect(() => {
    if (notifications && notifications.length > 0 && !hasNewNotifications) {
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

  const handleClick = async (notification) => {
    const response = await markNotificationAsRead(notification && notification.id);
    if (response) {
      router.push(`/tradeid/${notification.tradeId}`);
    }else{
      handleTrigger(true,dispatch,setPopup({title:'error',content:"Failed to mark notification as read"}));
    }
  };

  const handleViewMore = () => {
    setVisibleNotifications(prev => prev + 5);
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
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              <ul className="p-2">
                {notifications && notifications.length > 0 ? (
                  <>
                    {notifications.slice(0, visibleNotifications).map((notification, index) => (
                      <li key={index} onClick={() => handleClick(notification)} className={`p-2 border-b border-gray-200 last:border-0 ${notification.notificationStatus ? 'bg-green-100' : 'bg-red-100'} cursor-pointer`}>
                        {notification.message.length > 50 ? `${notification.message.substring(0, 50)}...` : notification.message}
                      </li>
                    ))}
                    {notifications.length > visibleNotifications && (
                      <li className="p-2 text-center text-blue-500 cursor-pointer" onClick={handleViewMore}>
                        View more
                      </li>
                    )}
                  </>
                ) : (
                  <li className="p-2">No notifications</li>
                )}
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


