import React, { useState, useEffect } from 'react'
import Logo from 'websiteInfo/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { openLoginPopup, openPopup, setPageLoading, setPopup } from 'store/actions/commonAction'
import { useRouter } from 'next/router'
import { getUserNotifications, handleTrigger } from 'utils/utils'
import Link from 'next/link';
import SearchBar from './common/SearchBar'
import { logout } from 'store/actions/authAction'
import IconView from './IconView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import Skeleton from './common/Skeleton'
import { parseCookies } from 'nookies'

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pageLoading = useSelector((state) => state.common.pageLoading);
  const userId = useSelector((state) => state.user.userId);
  const token = parseCookies().token;
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const handleUploadClothes = () => {
    handleTrigger((user ? true : false), dispatch, setPopup({ title: 'Upload Listing Items', content: 'upload' }));

  }
  const router = useRouter();
  const { asPath } = router;
  const pathValue = asPath.split('/')[1].split('?')[0];
  console.log('==>path', pathValue, user);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/home');
    setIsSignedInMenuOpen(false);
  };

  useEffect(async () => {
    const notifications = await getUserNotifications(userId, token);
    console.log('==>notifications', notifications,token);
    setNotifications(notifications);
  }, [userId,token]);


  if (pageLoading) {
    return (
      <header className="sticky top-0 z-50">
        <div className='w-full pl-2 pr-2 mt-2 shadow-lg'>
          <div className='w-full flex flex-col md:flex-row items-center justify-between'>
                       <div className='w-full md:w-full'>
              <div className='mt-4 bg-gray-100 rounded-lg' style={{ backgroundColor: '#D2EB63' }}>
                <div className='flex flex-row px-7 p-auto items-center gap-4 md:items-center justify-between'>
                  <Skeleton width={100} height={40} />
                  <div className='md:hidden'>
                    <Skeleton width={24} height={24} />
                  </div>
                  <div className={`w-full flex flex-row max-md:hidden`}>
                    <Skeleton width={200} height={40} />
                    <div className="flex items-center">
                      <Skeleton width={40} height={40} />
                    </div>
                  </div>
                  <div className={`relative w-auto flex items-center align-baseline justify-center gap-8 max-md:hidden`}>
                    <Skeleton width={100} height={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50">
          <div className='w-full pl-2 pr-2 mt-2 shadow-lg'>
            <div className='w-full flex flex-col md:flex-row items-center justify-between'>
              <div className='w-full md:w-full'>
                <div className='mt-4 bg-gray-100 rounded-lg' style={{ backgroundColor: '#D2EB63'}}>
                  <div className='flex flex-row px-7 p-auto items-center gap-4 md:items-center justify-between'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Link href={`/home`} passHref={true} className='cursor-pointer'>
                      <Logo />
                    </Link>
                    <div className='md:hidden'>
                      <button onClick={toggleMenu} className='text-white focus:outline-none'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4 6h16M4 12h16m-7 6h7'></path>
                        </svg>
                      </button>
                    </div>
                    <div className={`w-full flex flex-row max-md:hidden`}>
                      <SearchBar pathValue={pathValue} />
                      <div className="flex items-center">
                        <button onClick={handleUploadClothes} className="focus:outline-none cursor-pointer flex flex-col items-center p-2">
                          <FontAwesomeIcon icon={faCloudUploadAlt} className="text-xl mb-1 text-white" />
                          <span className="text-xs text-white">Upload</span>
                        </button>
                      </div>
                    </div>

                    <div className={`relative w-auto flex items-center align-baseline justify-center gap-8 max-md:hidden`}>
                      <IconView notifications={notifications} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isOpen && (
              <div className='md:hidden'>
                <div className='flex flex-col items-center'>
                  <SearchBar pathValue={pathValue} />
                  <div className='py-2'>
                    {user ? (
                      <Link href='#' onClick={handleLogout} className='text-white hover:text-gray-200 no-underline'>
                        Logout
                      </Link>
                    ) : (
                      <Link href='/login' onClick={dispatch(openLoginPopup())} className='text-white hover:text-gray-200 no-underline'>
                        Login
                      </Link>
                    )}
                  </div>
                  <div className='py-2'>
                    <Link href='#' className='text-white hover:text-gray-200 no-underline'>
                      Cart
                    </Link>
                  </div>
                  <div className='py-2'>
                    <Link href='/browse/Men' className='text-white hover:text-gray-200 no-underline'>
                      Men
                    </Link>
                  </div>
                  <div className='py-2'>
                    <Link href='/browse/Women' className='text-white hover:text-gray-200 no-underline'>
                      Women
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
    </header>
  )
}

export default Header;
