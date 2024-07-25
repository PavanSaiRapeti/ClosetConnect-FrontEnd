
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import IconView from './IconView'

const HeaderComponent = ({user}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const router = useRouter();
  return (
    <>
      <div>
        <div className='flex items-center justify-center'>
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
      </div>
      <IconView />
    </>
  )
}

export default HeaderComponent;