import React, { lazy, Suspense } from 'react';
import ListingCard from '@/components/Home/components/ListingCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import { wrapper } from 'store';
import { getItem, getTrade } from 'utils/utils';
import Layout from 'pages/Layout';
import { setPageLoading } from 'store/actions/commonAction';
import { parseCookies } from 'nookies';
import { checkAuth } from 'utils/authHelpers';
import { SET_USER_ID, VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import Loading from '@/components/Loading';

const SwapComponent = lazy(() => import('@/components/SwapComponent'));




const ItemDetails = ({ trade, user }) => {

  console.log('trade==>', trade);
  return (
    <Layout user={user}>
      Trade information
      <Suspense fallback={<Loading />}>
        <SwapComponent {...trade} />
      </Suspense>
    </Layout>

  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params;
  const cookies = parseCookies(context);
  const { token, userId } = cookies;
  console.log('dog==>', token, userId, store);
  store.dispatch(setPageLoading(true));
  let userData = null;


  if (token) {
    const { user } = await checkAuth(token, userId);
    userData = user || null;
    if (user) {
      store.dispatch({
        type: VALIDATE_TOKEN_SUCCESS,
        payload: { user: userData, isLoggedIn: true }
      });
      store.dispatch({
        type: SET_USER_ID,
        payload: userId
      });
    }
  }
  console.log('trade==>',token,id);
  const trade = await getTrade(id, token);
  console.log('trade==>',trade);
  store.dispatch(setPageLoading(false));

  return {
    props: {
      user: userData,
      trade: trade
    },
  };
});

export default ItemDetails;
