import React, { useState } from 'react'
import Logo from 'websiteInfo/Logo'
import HeaderComponent from './HeaderComponent'
import { useDispatch, useSelector } from 'react-redux'
import { openLoginPopup, openPopup, setPopup } from 'store/actions/commonAction'
import { useRouter } from 'next/router'
import UploadItemForm from './common/UploadItemForm'
import { handleTrigger } from 'utils/utils'
import Link from 'next/link';

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch =useDispatch();
  const router=useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const handleUploadClothes = () => {
    handleTrigger(isLoggedIn,dispatch,setPopup({title:'Upload Listing Items', content: 'upload'}));
    
  }

  return (
    <div className='header'>
      
      <div className='w-full pl-2 pr-2 bg-ccWhite'>
        <div className='w-full flex flex-col md:flex-row items-center justify-between'>
          <div className='w-full md:w-full p-4 '>
            <div className='bg-gray-100 rounded-2 p-4 rounded-lg' style={{ backgroundColor: '#D2EB63' }}>
              <div className='flex flex-row pl-7 items-center gap-4 h-6 md: justify-between'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Link href='/home' passHref>
                <Logo />
                  </Link>
                <div className='md:hidden'>
                  <button onClick={toggleMenu} className='text-blue-500 focus:outline-none'>
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
                <div className={`w-full md:flex md:flex-row gap-10 items-center justify-center max-md:hidden`}>
                  <div className='py-2'>
                    <Link href={`/browse/Men`} className='text-blue-500 hover:text-blue-700 no-underline'>
                      Men
                    </Link>
                  </div>
                  <div className='py-2'>
                    <Link href={`/browse/Women`} className='text-blue-500 hover:text-blue-700 no-underline'>
                      Women
                    </Link>
                  </div>
                </div>
                  <div className={`w-1/6 md:flex `}>
                    <button 
                      className='w-full bg-ccPink hover:bg-ccBlack text-ccWhite font-bold py-2 px-4 rounded '
                      onClick={handleUploadClothes}>
                      Upload
                    </button>
                  </div>

                <div className={`relative w-1/4 p-2 flex items-center justify-center gap-8 max-md:hidden`}>
                  <HeaderComponent user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className='md:hidden'>
            <div className='flex flex-col items-center'>
              <div className={`relative w-1/4 p-2 flex items-center gap-8 `}>
                <div className='relative text-gray-600 focus-within:text-gray-400 w-full md-full max-w-md mx-auto'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                    <button type='submit' className='p-1 focus:outline-none focus:shadow-outline'>
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 50 50'>
                        <path d='M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z'></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type='search'
                    name='q'
                    className='w-full py-2 text-sm text-ccWhite bg-ccWhite rounded-md pl-10 focus:outline-none focus:bg-ccWhite focus:text-gray-900'
                    placeholder='Search...'
                    autoComplete='off'
                    required
                  />
                </div>
              </div>
              <div className='py-2'>
                {user ? (
                  <Link href='/logout' className='text-blue-500 hover:text-blue-700 no-underline'>
                    Logout
                  </Link>
                ) : (
                  <Link href='/login' onClick={dispatch(openLoginPopup())} className='text-blue-500 hover:text-blue-700 no-underline'>
                    Login
                  </Link>
                )}
              </div>
              <div className='py-2'>
                <Link href='#' className='text-blue-500 hover:text-blue-700 no-underline'>
                  Cart
                </Link>
              </div>
              <div className='py-2'>
                <Link href='#' className='text-blue-500 hover:text-blue-700 no-underline'>
                  Men
                </Link>
              </div>
              <div className='py-2'>
                <Link href='#' className='text-blue-500 hover:text-blue-700 no-underline'>
                  Women
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header