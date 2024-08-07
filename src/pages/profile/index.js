import React, { useEffect, useState } from 'react'
import ProfileSection from '@/components/Home/ProfileSection'
import Layout from 'pages/Layout'
import { setPageLoading, setPopup } from 'store/actions/commonAction'
import { wrapper } from 'store'
import { parseCookies } from 'nookies'
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router'
import { redirectToLogin } from 'utils/redirect'
import { getUserClothingItemsRequest } from 'store/actions/ItemAction'
import { setUserId } from 'store/actions/userAction'
import { validateTokenAndFetchUser } from 'utils/authHelpers';
import ListingGrid from '@/components/Home/LisitingGrid'
import { handleTrigger } from 'utils/utils'

const Profile = ({ user, userId, message }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      dispatch(getUserClothingItemsRequest(userId, 5, page));
      dispatch(setUserId(userId))
    }
  }, [dispatch, userId, user])
  useEffect(() => {
    if (message) {
      handleTrigger(true,dispatch,setPopup({title:'error',content:message}));
      router.push('/profile');
    }
  }, [message]);

  return (
    <Layout user={user}>
      <div className='flex flex-col w-full h-full p-4'>
        <div className='flex flex-col md:flex-row w-full h-full space-y-4 md:space-y-0 md:space-x-4'>
          <div className='w-full md:w-1/6 h-full flex justify-center mb-4 md:mb-0'>
            <ProfileSection
              userName={user?.userName}
              topSize={user?.topSize}
              bottomSize={user?.bottomSize}
              email={user?.email}
              name={user?.name}
              role={user?.role}
              gender={user?.gender}
              profilePicture={user?.profilePicture}
              userId={userId}
            />
          </div>
          <div className='w-full md:w-5/6 h-full flex flex-col mb-4 md:mb-0'>
            <h1 className='font-extrabold'>LISTING</h1>
            <div className='p-1 h-full flex-grow'>
              <ListingGrid page={page} setPage={setPage} userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, query }) => {
  const cookies = parseCookies({ req });
  const { token, userId } = cookies;

  const userData = await validateTokenAndFetchUser(store, token, userId, res);
  if (!userData) {
    return redirectToLogin;
  }

  const message = query.message || null;
  console.log(message,'asdf');

  return {
    props: {
      user: userData || null,
      userId: userId || null,
      message: message
    },
  }
})

export default Profile;