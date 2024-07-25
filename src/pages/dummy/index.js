import React from 'react';
import Layout from 'pages/Layout'

const loginPage = () => {
  return (
    <Layout>
      <ul className='icon-view xl:pl-15 2xl:pl-0 grid grid-cols-5 md:grid-cols-3 lg:grid-cols-3 justify-end order-2 md:order-3 col-span-5 md:col-span-3 md:pl-10 lg:pl-0 mt-5 md:mt-7 lg:mt-7 iconview-margin-top 3xl:col-start-11 pdp-print-none items-baseline'>
        <li
          id='header-customer-service'
          className='header-nav-icon help-icon group relative list-none helpIconMobileTablet'>
          <div
            role='button'
            className='focus:outline-none cursor-pointer open-btn'
            tabIndex='-1'
            onClick="openOverlay('overlay1')">
            <div className='text-center inline-block w-full md:w-14 ipadfix:w-82 text-primary-variant-2 border-b-4 border-ccWhite rounded-sm ipadfix:group-hover:border-primary-accent-1 pointer'>
              <i className='fas fa-info-circle text-2xl text-center leading-6'></i>
              <span className='ipadfix:block ipadfix:text-center text-base leading-4 font-bold cursor-pointer hidden text-primary-variant-2 border-b-4 border-ccWhite font-allumin_std mt-1'>
                Help
              </span>
            </div>
          </div>

          <div
            id='overlay1'
            className='header-overlay help_sign p-8 text-justify w-fixed w-300 h-screen shadow-2xl bg-ccWhite backdrop-blur-3xl transition ease-in-out duration-200 delay-200'>
            <div className='pb-4 pt-2'>
              <div className='text-right close-btn' onClick="closeOverlay('overlay1')">
                <i
                  aria-hidden='true'
                  className='fal fa-times text-gray-500 close_signin_navigation text-2xl lg:space-y-0'></i>
              </div>
              <div className='text-center'>
                <span className='w-10 lg:w-21 text-primary-variant-2 border-b-4 border-ccWhite '>
                  <i className=' fas fa-info-circle text-2xl'></i>
                  <span className='block font-bold'>Help</span>
                </span>
                <p className='text-gray-400 font-normal'>24/7 Customer Care</p>
              </div>
            </div>
            <div className='bg-gray-200 h-0.5'></div>
            <div className='flex w-auto justify-center'>
              <ul>
                <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                  <a href='tel:1-800-645-7270' className='block hover:text-monochromes px-6 pt-5'>
                    <i className='fas fa-phone'></i>
                    <span id='header-customer-service-call-us' className='ml-3'>
                      1-800-645-7270
                    </span>
                  </a>
                </li>
                <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                  <span onClick='advancedChat()' className='block hover:text-monochromes px-6 pt-5'>
                    <i className='fas fa-comments'></i>
                    <span id='header-customer-service-live-chat' className='ml-3'>
                      Live Chat
                    </span>
                  </span>
                </li>
                <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                  <a href='/customer-service/information' className='block hover:text-monochromes px-6 pt-5'>
                    <i className='fas fa-info-circle'></i>
                    <span id='header-customer-service-help-center' className='ml-3'>
                      Help Center
                    </span>
                  </a>
                </li>
                <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                  <a href='/corporate/about-msc' className='block hover:text-monochromes px-6 pt-5'>
                    <i className='fas fa-building'></i>
                    <span id='header-customer-service-about-us' className='ml-3'>
                      About Us
                    </span>
                  </a>
                </li>
                <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                  <span onClick="f('#QSIFeedbackButton-btn')?.click()" className='block hover:text-monochromes px-6 pt-5'>
                    <i className='fas fa-comment-alt-lines'></i>
                    <span id='header-customer-service-give-feedback' className='ml-3'>
                      Give Feedback
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li id='header-customer-service' className='header-nav-icon help-icon group relative list-none helpIconDesktop'>
          <a
            href='/customer-service/information'
            data-name='customer service'
            className='focus:outline-none cursor-pointer'
            tabIndex='-1'>
            <div className='text-center inline-block w-6 md:w-14 lg:w-auto ipadfix:w-82 text-primary-variant-2 border-b-4 border-ccWhite rounded-sm ipadfix:group-hover:border-primary-accent-1 pointer'>
              <i className='fas fa-info-circle text-2xl text-center leading-6'></i>
              <span className='ipadfix:block ipadfix:text-center text-base leading-4 font-bold cursor-pointer hidden text-primary-variant-2 border-b-4 border-ccWhite font-allumin_std mt-1'>
                Help
              </span>
            </div>
          </a>
          <div className='-left-12 z-99 ccWhitespace-no-wrap absolute bg-ccWhite min-w-max text-justify hidden ipadfix:group-hover:block items-center top-cls-help py-4 shadow-xl rounded-xl font-normal leading-8 z-10'>
            <ul>
              <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                <a href='tel:1-800-645-7270' className='block hover:text-monochromes px-6'>
                  <i className='fas fa-phone'></i>
                  <span id='header-customer-service-call-us' className='ml-3'>
                    1-800-645-7270
                  </span>
                </a>
              </li>
              <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                <span onClick='advancedChat()' className='block hover:text-monochromes px-6'>
                  <i className='fas fa-comments'></i>
                  <span id='header-customer-service-live-chat' className='ml-3'>
                    Live Chat
                  </span>
                </span>
              </li>
              <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                <a href='/customer-service/information' className='block hover:text-monochromes px-6'>
                  <i className='fas fa-info-circle'></i>
                  <span id='header-customer-service-help-center' className='ml-3'>
                    Help Center
                  </span>
                </a>
              </li>
              <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                <a href='/corporate/about-msc' className='block hover:text-monochromes px-6'>
                  <i className='fas fa-building'></i>
                  <span id='header-customer-service-about-us' className='ml-3'>
                    About Us
                  </span>
                </a>
              </li>
              <li aria-hidden='true' className='hover:bg-monochromes-grey cursor-pointer'>
                <span onClick="f('#QSIFeedbackButton-btn')?.click()" className='block hover:text-monochromes px-6'>
                  <i className='fas fa-comment-alt-lines'></i>
                  <span id='header-customer-service-give-feedback' className='ml-3'>
                    Give Feedback
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </li>

        <li
          className='header-nav-icon signin-icon group text-center relative trigger_account list-none col-start-3 md:col-start-2'
          id='main-account-signin'>
          <a href='/ui/identity/logon?redirect='>
            <span className='text-primary-variant-2 w-full border-b-4 cursor-pointer border-ccWhite rounded-sm ipadfix:group-hover:border-primary-accent-1'>
              <span aria-hidden='true' className='inline-block text-primary-variant-2 w-full cursor-pointer'>
                <i className='fas fa-user text-2xl leading-6' aria-hidden='true'></i>
                <span
                  aria-hidden='true'
                  className='hidden ipadfix:block font-bold text-base leading-4 font-allumin_std mt-1'>
                  Sign In
                </span>
              </span>
            </span>
          </a>
        </li>

        <li
          id='UpdateCartItemNum'
          className='header-nav-icon group relative trigger_account list-none text-right ipadfix:text-right col-start-5 md:col-start-3 mt-1 ipadfix:mt-0'>
          <a
            href='/ui/cart'
            id='cart-icon'
            className='inline-block ipadfix:w-21 text-primary-variant-2 border-b-4 border-ccWhite rounded-sm hover:border-primary-accent-1 relative outline-none'
            tabIndex='-1'
            data-name='shopping cart'>
            <span
              className='-top-3.5 absolute font-bold 3xl:left-3 2xl:left-2.5 xl:left-3 lg:left-2 md:left-2 md:ml-0.5 left-2.5 ipadfix:block text-xs'>
              <span id='header-cart-count' className=''></span>
            </span>
            <i className='w-full text-center fas fa-shopping-cart text-2xl leading-6'></i>
            <span className='text-center font-bold hidden ipadfix:block text-base leading-4 font-allumin_std mt-1'>
              Cart
            </span>
          </a>
        </li>
      </ul>
    </Layout>
  )
}

export default loginPage
