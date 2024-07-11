import React from 'react';
import ProfileSection from '@/components/Home/ProfileSection'
import ListingGrid from '@/components/Home/LisitingGrid'
import ReviewSection from '@/components/Home/ReviewSection'
import Header from '@/components/Header';

const Profile = ({ user }) => {
    console.log('user', user)
    return (
      <div className='flex flex-col w-screen h-screen'>
        <div>
          <Header user={user} />
        </div>
        <div className='flex'>
          <div className='w-1/6'>
            <div className='flex justify-center'>
              <ProfileSection />
            </div>
          </div>
          <div className='w-2/3'>
            <h1 className='font-extrabold'>
              LISITNG
            </h1>
          <div className='p-1'>
            <ListingGrid />
            </div>
          </div>
          <div className='w-1/6'>
            <div className='flex justify-center'>
              <ReviewSection />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export async function getServerSideProps({ req, res }) {
    const token = req?.cookies?.token || true
  
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    // const user = await validateTokenAndGetUser(token);
  
    // if (user) {
    //   return {
    //     redirect: {
    //       destination: '/login',
    //       permanent: false,
    //     },
    //   };
    // }
  
    return {
      props: {
        user: null,
      },
    }
  }
  
  export default Profile;