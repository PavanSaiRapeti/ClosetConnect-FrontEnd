import React, { useEffect } from 'react'
import ProfileSection from '@/components/Home/ProfileSection'
import ReviewSection from '@/components/Home/ReviewSection'
import ListingGrid from '@/components/Home/LisitingGrid'
import { redirectToLogin } from 'utils/redirect'
import { checkAuth } from 'utils/authHelpers'
import Layout from 'pages/Layout'
import { closeLoginPopup } from 'store/actions/commonAction'
import { wrapper } from 'store'
import { parseCookies } from 'nookies'
import { validateTokenSuccess } from 'store/actions/authAction'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

const reviews = [
  {
    name: 'John D.',
    rating: 5,
    title: 'Outstanding Service!',
    content:
      "I've been using their services for over a year now, and I couldn't be happier. The transition to their cloud-based platform was seamless, and their support team is always available to help. Highly recommend!",
  },
  {
    name: 'Emily R.',
    rating: 5,
    title: 'Excellent Customer Support',
    content:
      "The customer support team is phenomenal. They were patient and thorough in addressing all my queries. The cloud solution they provided has significantly improved our team's productivity. Two thumbs up!",
  },
  {
    name: 'Michael S.',
    rating: 5,
    title: 'Highly Reliable and Secure',
    content:
      "Security was a major concern for us, but their cloud services have proven to be incredibly reliable and secure. We've had zero issues, and the peace of mind is priceless. Fantastic service!",
  },
  {
    name: 'Sarah L.',
    rating: 5,
    title: 'A Game Changer for Our Business',
    content:
      'Moving to the cloud with their assistance has been a game-changer for our business. The scalability and flexibility we now have are unparalleled. Our operations have never been smoother!',
  },
  {
    name: 'David K.',
    rating: 5,
    title: 'Impressive Innovation',
    content:
      'Their cloud solutions have empowered us to innovate and stay ahead of the competition. The access to the latest technologies has opened up new opportunities for growth. Truly impressive!',
  },
]


const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router=useRouter();  
  useEffect(()=>{
    if(user){
      dispatch(validateTokenSuccess(user));
    }else{
      dispatch(closeLoginPopup());
      router.push('/home')
    }
  },[dispatch, user, router])


  return (
    <Layout user={user}>
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
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const cookies = parseCookies({req,res});
  const { token, userId } = cookies;
  const { isRedirect, user } = await checkAuth(token,userId);
  console.log('==>123',cookies,isRedirect, user)
  if (isRedirect) return redirectToLogin;
 
  return {
    props: {
      user: user,
    },
  }
})

export default Profile;