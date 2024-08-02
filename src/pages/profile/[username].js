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
import { wrapper } from 'store';

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req, res }) => {
  const { username } = params;
  const cookies = parseCookies({ req, res });
  const { token, userId } = cookies;

  try {
    const { isRedirect, user } = await checkAuth(token, userId);
    if (isRedirect) return redirectToLogin;

    const userProfile = await getUser(username);
    if (!userProfile) {
      return {
        notFound: true,
      };
    }

    store.dispatch(setUserId(userId));
    store.dispatch(setToken(token));
    store.dispatch(setPageLoading(true));

    return {
      props: {
        user: userProfile,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        user: null,
      },
    };
  }
});

export default UserProfile;