import React, { lazy, Suspense, useEffect } from 'react';
import ListingCard from '@/components/Home/components/ListingCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import { wrapper } from 'store';
import { getItem, getTrade } from 'utils/utils';
import Layout from 'pages/Layout';
import { setPageLoading } from 'store/actions/commonAction';
import { parseCookies } from 'nookies';
import { checkAuth, validateTokenAndFetchUser } from 'utils/authHelpers';
import { SET_USER_ID, VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import Loading from '@/components/Loading';
import { useDispatch } from 'react-redux';

const SwapComponent = lazy(() => import('@/components/SwapComponent'));




const ItemDetails = ({ trade, user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageLoading(false));
  }, []);
  return (
    <Layout user={user}>
      Trade information
      <Suspense fallback={<Loading />}>
        <SwapComponent {...trade} userName={user?.name}/>
      </Suspense>
    </Layout>

  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params;
  const { res } = context;
  const cookies = parseCookies(context);
  const { token, userId } = cookies;
  console.log('dog==>', token, userId, store);
  store.dispatch(setPageLoading(true));
  const userData = await validateTokenAndFetchUser(store, token, userId, res);
  const trade = await getTrade(id, token);
  console.log('trade==>',trade);
  store.dispatch({type:'SET_USER', payload: userData });
  return {
    props: {
      user: userData || null,
      trade: trade || null
    },
  };
});

export default ItemDetails;
