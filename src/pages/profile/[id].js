import React, { useEffect, useState } from 'react';
import Layout from 'pages/Layout';
import ProfileSection from '@/components/Home/ProfileSection';
import ListingGrid from '@/components/Home/LisitingGrid';
import ReviewSection from '@/components/Home/ReviewSection';
import { getUser } from 'utils/utils';
import { setToken, setUserId } from 'store/actions/userAction';
import { setPageLoading } from 'store/actions/commonAction';
import { wrapper } from 'store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { parseCookies } from 'nookies';
import { validateTokenAndFetchUser } from 'utils/authHelpers';
import { getUserClothingItemsRequest } from 'store/actions/ItemAction';

const UserProfile = ({ user, userId, guestUser, guestUserId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (guestUser) {
      dispatch(getUserClothingItemsRequest(guestUserId, 5, 0));
    }
  }, [dispatch, guestUserId, guestUser])

  return (
    <Layout user={user}>
      <div className='flex flex-col w-full h-full p-4'>
        <div className='flex flex-col md:flex-row w-full h-full space-y-4 md:space-y-0 md:space-x-4'>
          <div className='w-full md:w-1/6 h-full flex justify-center mb-4 md:mb-0'>
            <ProfileSection
              userName={guestUser?.userName}
              topSize={guestUser?.topSize}
              bottomSize={guestUser?.bottomSize}
              name={guestUser?.name}
              gender={guestUser?.gender}
              profilePicture={guestUser?.profilePicture}
              userId={guestUserId}
            />
          </div>
          <div className='w-full md:w-2/3 h-full flex flex-col mb-4 md:mb-0'>
            <h1 className='font-extrabold'>LISTING</h1>
            <div className='p-1 h-full flex-grow'>
              <ListingGrid userId={guestUser?.userId} page={page} setPage={setPage} 
              guestUser={guestUser} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req, res }) => {
  const { id } = params;
  const cookies = parseCookies({ req, res });
  const { token, userId } = cookies;
  const userData = await validateTokenAndFetchUser(store, token, userId, res);
  const userProfile = await getUser(id, token);
  if (!userProfile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      guestUser: userProfile || null,
      user: userData || null,
      userId: userId || null,
      guestUserId: id || null
    },
  }


});

export default UserProfile;