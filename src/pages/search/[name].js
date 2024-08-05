import React, { useEffect } from 'react';
import Layout from 'pages/Layout';
import { wrapper } from 'store';
import { parseCookies } from 'nookies';
import { checkAuth, validateTokenAndFetchUser } from 'utils/authHelpers';
import { VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import AllLisiting from '@/components/AllLisiting';
import { useDispatch } from 'react-redux';
import { getUserClothingItemsRequest } from 'store/actions/ItemAction';
import { setToken, setUserId } from 'store/actions/userAction';
import { getAllItems, getItemByGender, getItemByType } from 'utils/utils';

const CategoryPage = ({title, user,userId,allItems}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(userId){
      dispatch(getUserClothingItemsRequest(userId,30,0));
    }
  },[userId]);

  useEffect(()=>{
    dispatch({
      type: 'CREATE_ALL_ITEMS',
      payload: allItems
    });
  },[allItems]);
  
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
    const { res } = context;
    const cookies = parseCookies(context);
    const { token, userId } = cookies;
    const  userData = await validateTokenAndFetchUser(store, token, userId, res);
    let allItems;
    if(slug === 'Men'|| slug === 'Women'){
        allItems = await getItemByGender((slug === 'Men'? 'MALE':'FEMALE'),30,0);
    }
    else if(slug === 'Tops'||slug === 'Bottoms'){
      allItems = await getItemByType((slug === 'Tops'? 'TOPS':'BOTTOMS'),30,0);
    }
    else{
      allItems = await getAllItems(30,0);
    }
      return {
        props: {
               title:slug,
              user: userData,
              userId:userId || null,
              allItems:allItems || []
          },
      };
    }
  );

export default CategoryPage;