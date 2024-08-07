import React, { lazy, Suspense, useEffect } from 'react';
import ListingCard from '@/components/Home/components/ListingCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import { wrapper } from 'store';
import { getItem, getTrade, handleTrigger } from 'utils/utils';
import Layout from 'pages/Layout';
import { setPageLoading, setPopup } from 'store/actions/commonAction';
import { parseCookies } from 'nookies';
import { checkAuth, validateTokenAndFetchUser } from 'utils/authHelpers';
import { SET_USER_ID, VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import Loading from '@/components/Loading';
import { useDispatch } from 'react-redux';

const SwapComponent = lazy(() => import('@/components/SwapComponent'));




const ItemDetails = ({ trade, user }) => {


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
  store.dispatch(setPageLoading(true));
  const userData = await validateTokenAndFetchUser(store, token, userId, res);
  const trade = await getTrade(id, token);
  store.dispatch({type:'SET_USER', payload: userData });
  if(trade.status === 'COMPLETED'){
    handleTrigger(true,store.dispatch,setPopup({title:'Completed',content:"Trade already completed"}));
    return {
      redirect: {
        destination: '/profile?message=Trade already completed',
        permanent: false,
      },
    };
  }
  console.log(userData,trade,'==<=userData');
  return {
    props: {
      user: userData || null,
      trade: trade || null,
    },
  };
});

export default ItemDetails;
