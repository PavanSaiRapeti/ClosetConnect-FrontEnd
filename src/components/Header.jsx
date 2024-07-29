import React, { useState } from 'react'
import Logo from 'websiteInfo/Logo'
import HeaderComponent from './HeaderComponent'
import { useDispatch, useSelector } from 'react-redux'
import { openLoginPopup, openPopup, setPopup } from 'store/actions/commonAction'
import { useRouter } from 'next/router'
import UploadItemForm from './common/UploadItemForm'
import { handleTrigger } from 'utils/utils'
import Link from 'next/link';
import SearchBar from './common/SearchBar'

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch =useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const handleUploadClothes = () => {
    handleTrigger(isLoggedIn,dispatch,setPopup({title:'Upload Listing Items', content: 'upload'}));
    
  }
   const router = useRouter();
  const { asPath } = router;
  const pathValue = asPath.split('/')[1].split('?')[0]; // Get the value between '/' and '?' if '?' is present
  console.log('==>path', pathValue);

  return (
    <div className='header'>
      
      <div className='w-full pl-2 pr-2 bg-ccWhite'>
        <div className='w-full flex flex-col md:flex-row items-center justify-between'>
          <div className='w-full md:w-full p-4 '>
            <div className='bg-gray-100 rounded-2 p-4 rounded-lg' style={{ backgroundColor: '#D2EB63' }}>
              <div className='flex flex-row pl-7 items-center gap-4 h-6 md: justify-between'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Link href={`/home`} passHref={true} className='cursor-pointer' >
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
                  <HeaderComponent pathValue={pathValue} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className='md:hidden'>
            <div className='flex flex-col items-center'>
              <SearchBar pathValue={pathValue}/>
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