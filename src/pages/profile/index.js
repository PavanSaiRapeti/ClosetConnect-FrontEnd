import React, { useEffect, useState } from 'react'
import ProfileSection from '@/components/Home/ProfileSection'
import Layout from 'pages/Layout'
import { setPageLoading } from 'store/actions/commonAction'
import { wrapper } from 'store'
import { parseCookies } from 'nookies'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { redirectToLogin } from 'utils/redirect'
import { getUserClothingItemsRequest } from 'store/actions/ItemAction'
import { setUserId } from 'store/actions/userAction'
import { validateTokenAndFetchUser } from 'utils/authHelpers';
import ListingGrid from '@/components/Home/LisitingGrid'

const Profile = ({ user, userId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(getUserClothingItemsRequest(userId, 5, page));
      dispatch(setUserId(userId))
    }
  }, [dispatch, userId, user])

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
          <div className='w-full md:w-2/3 h-full flex flex-col mb-4 md:mb-0'>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const cookies = parseCookies({ req });
  const { token, userId } = cookies;

  const userData = await validateTokenAndFetchUser(store, token, userId, res);
  if (!userData) {
    return redirectToLogin;
  }

  return {
    props: {
      user: userData || null,
      userId: userId || null
    },
  }
})

export default Profile;