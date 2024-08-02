import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'pages/Layout';
import ProfileSection from '@/components/Home/ProfileSection';
import ListingGrid from '@/components/Home/LisitingGrid';
import ReviewSection from '@/components/Home/ReviewSection';
import { getUser } from 'utils/utils';
import UserNotFound from 'pages/usernotfound';
import { checkAuth } from 'utils/authHelpers';
import { setToken, setUserId } from 'store/actions/userAction';
import { setPageLoading } from 'store/actions/commonAction';

const UserProfile = ({ user }) => {

  return (
    <Layout>
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/6'>
          <div className='flex justify-center'>
            <ProfileSection
              userName={user?.userName}
              topSize={user?.topSize}
              bottomSize={user?.bottomSize}
              email={user?.email}
              name={user?.name}
              role={user?.role}
              gender={user?.gender}
              profilePicture={user?.profilePicture}
              onUploadClothes={handleUploadClothes}
            />
          </div>
        </div>
        <div className='w-full md:w-2/3'>
          <h1 className='font-extrabold'>LISTING</h1>
          <div className='p-1'>
            <ListingGrid />
          </div>
        </div>
        <div className='w-full md:w-1/6'>
          <div className='flex justify-center'>
            <ReviewSection reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { username } = context.params;
  const cookies = parseCookies({ req, res });
  const { token, userId } = cookies;
  store.dispatch(setUserId(userId));
  store.dispatch(setToken(token));
  store.dispatch(setPageLoading(true));
  
  const user = await getUser(username);
  if (!user) {
    return {
      redirect: {
        destination: '/usernotfound',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export default UserProfile;