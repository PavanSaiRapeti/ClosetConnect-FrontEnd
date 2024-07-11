import Image from 'next/image'
import React, { useState } from 'react'
import shop from '../websiteInfo/shopping.png'
import user from '../websiteInfo/user.png'

const HeaderComponent = () => {
  return (
    <>
      <div>
        <div className='flex items-center justify-center w-full'>
          <div className='relative text-gray-600 focus-within:text-gray-400'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <button type='submit' className='p-1 focus:outline-none focus:shadow-outline'>
                <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='20' height='20' viewBox='0 0 50 50'>
                  <path d='M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z'></path>
                </svg>
              </button>
            </span>
            <input
              type='search'
              name='q'
              className='py-2 text-sm text-white bg-ccWhite rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900'
              placeholder='Search...'
              autoComplete='off'
              required
            />
          </div>
        </div>
      </div>
      <div >
        <button className='flex justify-center'>
          <Image src={shop} alt='shop' width={25} height={25} />
        </button>
      </div>
      <div >
        <button className='flex justify-center'>
          <Image src={user} alt='user' width={25} height={25} />
        </button>
      </div>
    </>
  )
}

export default HeaderComponent
