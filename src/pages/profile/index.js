import React, { useEffect, useState } from 'react'
import ProfileSection from '@/components/Home/ProfileSection'
import ListingGrid from '@/components/Home/LisitingGrid'
import Layout from 'pages/Layout'
import { closeLoginPopup, setPageLoading } from 'store/actions/commonAction'
import { wrapper } from 'store'
import { parseCookies } from 'nookies'
import { validateTokenSuccess } from 'store/actions/authAction'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { checkAuth } from 'utils/authHelpers'
import { redirectToLogin } from 'utils/redirect'
import { getUserClothingItemsRequest } from 'store/actions/ItemAction'
import { setNotification, setToken, setUserId } from 'store/actions/userAction'
import { getUserNotifications } from 'utils/utils'


const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(state => state.item.items);
  const itemsLength = items?.content?.length;
  const userId = useSelector(state => state.user.userId);
  const [page, setPage] = useState(0);



  useEffect(() => {
    if (user) {
      dispatch(validateTokenSuccess(user));
    } else {
      dispatch(closeLoginPopup());
      router.push('/home')
    }
  }, [dispatch, user, router])

  useEffect(() => {
    dispatch(getUserClothingItemsRequest(userId, 5,page));
  }, [page, dispatch, userId,itemsLength]);

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
            />
          </div>
          <div className='w-full md:w-2/3 h-full flex flex-col mb-4 md:mb-0'>
            <h1 className='font-extrabold'>LISTING</h1>
            <div className='p-1 h-full flex-grow'>
              <ListingGrid page={page} setPage={setPage} />
            </div>
          </div>
          <div className='w-full md:w-1/6 flex justify-center'>
            {/* <ReviewSection reviews={reviews} /> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const cookies = parseCookies({ req, res });
  const { token, userId } = cookies;
  const { isRedirect, user } = await checkAuth(token, userId);
  console.log('==>123', cookies, isRedirect, user);
  if (isRedirect) return redirectToLogin;

  store.dispatch(setUserId(userId));
  store.dispatch(setToken(token));
  store.dispatch(setPageLoading(true));
  
  return {
    props: {
      user: user,
    },
  }
})

export default Profile;