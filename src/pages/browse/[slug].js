import React, { useEffect, useState } from 'react';
import Layout from 'pages/Layout';
import { wrapper } from 'store';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { checkAuth } from 'utils/authHelpers';
import { VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import ListingGrid from '@/components/Home/LisitingGrid';
import AllLisiting from '@/components/AllLisiting';
import { useDispatch, useSelector } from 'react-redux';
import { getUserClothingItemsRequest } from 'store/actions/ItemAction';
import { setToken, setUserId } from 'store/actions/userAction';
import { setPageLoading } from 'store/actions/commonAction';
import { getAllItems, getItemByGender, getItemByType } from 'utils/utils';

const CategoryPage = ({title, user,userId}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(userId){
      dispatch(getUserClothingItemsRequest(userId,30,0));
    }
  },[userId]);

  return (
  <Layout user={user}>
    <section className="p-10" style={{ fontFamily: 'Ubuntu' }}>
      <AllLisiting title={title} />
    </section>
  </Layout>
    
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
    const { slug } = context.params;
    const cookies = parseCookies(context);
    const { token, userId } = cookies;
    let userData = null;
    if (token) {
      const { user } = await checkAuth(token, userId);
      userData = user || null;
      if (user) {
        store.dispatch({
          type: VALIDATE_TOKEN_SUCCESS,
          payload: { user: userData, isLoggedIn: true }
        });
      }
    }
    let allItems;
    console.log('slug==>',slug === 'Men');
    if(slug === 'Men'|| slug === 'Women'){
        allItems = await getItemByGender((slug === 'Men'? 'MALE':'FEMALE'),30,0);
    }
    else if(slug === 'Tops'||slug === 'Bottoms'){
      allItems = await getItemByType((slug === 'Tops'? 'TOPS':'BOTTOMS'),30,0);
    }
    else{
      allItems = await getAllItems(30,0);
    }
    console.log('slug==>',allItems);
    if(allItems){
    store.dispatch({
      type: 'CREATE_ALL_ITEMS',
      payload: allItems
    });
   }
   
   store.dispatch(setUserId(userId || null));
   store.dispatch(setToken(token || null));
   store.dispatch(setPageLoading(true));
      return {
        props: {
               title:slug,
              user: userData,
              userId:userId || null
          },
      };
    }
  );

export default CategoryPage;