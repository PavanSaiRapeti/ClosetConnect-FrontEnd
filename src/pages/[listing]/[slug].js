import React, { useEffect, useState } from 'react';
import ListingCard from '@/components/Home/components/ListingCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import { getItem, getItemImage } from 'utils/utils';
import Layout from 'pages/Layout';
import { openLoginPopup, setPageLoading } from 'store/actions/commonAction';
import { parseCookies } from 'nookies';
import { checkAuth } from 'utils/authHelpers';
import { SET_USER_ID, VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import ProductPage from '@/components/ProductCard';
import { wrapper } from 'store';
import TradeModal from '@/components/TradeModal';
import { useDispatch, useSelector } from 'react-redux';




const ProductDescription = ({ description, material, maintenance }) => {
  return (
    <div className="bg-purple-200 p-8 rounded-lg">
      <div className="flex justify-center mb-4">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border-2 border-gray-300">Description</button>
        <button className="bg-transparent text-gray-700 px-4 py-2 rounded-lg border-2 border-gray-300">Material and maintenance</button>
      </div>
      <div className="flex justify-center space-x-8">
        <div className="w-1/2 text-center">
          <div className="bg-gray-300 w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-gray-300"></div>
          <h2 className="text-lg font-semibold mb-2">Details and product description</h2>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        <div className="w-1/2 text-center">
          <div className="bg-gray-300 w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-gray-300"></div>
          <h2 className="text-lg font-semibold mb-2">Material and maintenance</h2>
          <p className="text-sm text-gray-700">{material}</p>
          <div className="flex justify-center space-x-2 mt-2">
            {maintenance.map((icon, index) => (
              <img key={index} src={icon} alt="Maintenance icon" className="w-8 h-8 rounded-lg border-2 border-gray-300" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const ItemDetails = ({ item, listingName, itemName, user, listing }) => {

  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector(state => state.user.userId);
  const dispatch = useDispatch();

  useEffect(async () => {
    console.log('==>listing', listing,item);
    if(item?.id){
      const response= await getItemImage(item.id);
      setImage(response);
      console.log('==>image', image);
    }
    // dispatch(setPageLoading(false));
  }, [item]);

  if (!item) {
    return <div className="p-6 bg-ccWhite rounded-lg shadow-lg">Loading...</div>;
  }
  const openModal = () => {
    if(userId){
      setIsModalVisible(true);
    }else{
      dispatch(openLoginPopup());
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <Layout user={user}>
    <div className="p-6 w-full h-screen bg-ccWhite rounded-lg shadow-lg">
    <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">Home</a> / <a href={`/browse/${listingName}`} className="hover:underline">{listingName}</a> / <span>{item.name}</span>
      </nav>
      <ProductPage   product={item} image={image} onTrade={openModal}/>
    </div>
    <TradeModal isVisible={isModalVisible} onClose={closeModal} product={listing} image={image} guestId={userId} />
    </Layout>

  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { listing, slug } = context.params;
  const { id } = context.query;
  const cookies = parseCookies(context);
  const { token, userId } = cookies;
  console.log('dog==>', context,token, userId, store);
  store.dispatch(setPageLoading(true));
  let userData = null;
  const item = await getItem(id);

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


  return {
    props: {
      item: item,
      listingName: listing,
      listing:null,
      user: userData || null,
      itemName: slug
    },
  };
});

export default ItemDetails;
