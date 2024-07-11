import React from 'react'
import Logo from 'websiteInfo/Logo'
import HeaderComponent from './HeaderComponent'

const Header = ({ user }) => {
  return (
    <div className='header'>
      <div className='w-full pl-2 pr-2'>
        <div className='w-full flex flex-col md:flex-col'>
          <div className='w-full md:w-1/2 lg:w-full p-4 '>
            <div className='bg-gray-100 rounded-2 p-4 rounded-lg' style={{ backgroundColor: '#D2EB63' }}>
              <div className='flex flex-row pl-7 items-center gap-64 h-6'>
                <Logo />
                <div className='w-full flex flex-wrap gap-2 justify-end'>
                  <div className='w-2/3 p-2 flex flex-row gap-16 items-center justify-center'>
                      <div className='py-2'>
                        <a href='#' className='text-blue-500 hover:text-blue-700 no-underline'>
                          Men
                        </a>
                      </div>
                      <div className='py-2'>
                        <a href='#' className='text-blue-500 hover:text-blue-700 no-underline'>
                          Women
                        </a>
                      </div>
                  </div>
                  <div className='relative w-1/4 p-2 flex items-center gap-8'>
                    <HeaderComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
