import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@/components/common/Skeleton';// Import the dummy image
import { data } from 'autoprefixer';
import { deleteItem, getItemImage, handleTrigger } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from 'store/actions/commonAction';

const ListingCard = ({ 
  listing,
  isLoading
}) => {
  const user = useSelector(state => state.auth.user);
  const userId = useSelector(state => state.user.userId);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const [image, setImage] = useState('https://via.placeholder.com/250');
  const defaultText = 'N/A';
  const initialData = {
    description: listing.description || "",
    type: listing.type || "",
    clothingItemSize: listing.clothingItemSize || "",
    name: listing.name || "",
    gender: listing.gender || "",
    status: listing.status || "",
    id: listing.id || ""
  };
  const handleEdit = () => {
    handleTrigger((user ? true : false), dispatch, setPopup({ title: 'Upload Listing Items', content: 'edit', data: initialData }));

  }


  useEffect(async () => {
    if(listing?.id){
    try { 
      const response= await getItemImage(listing.id, token);
        setImage(response);
      console.log('==>image', image);
    } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  }, [listing]);

  const handleDelete = async () => {
    try {
      await deleteItem(listing.id, userId,token);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };
  

  if (isLoading) {
    return (
      <div className="bg-ccWhite rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{width:"250px"}}>
        <Skeleton height="256px" />
        <div className="p-4">
          <Skeleton width="80%" height="24px" />
          <Skeleton width="60%" height="24px" />
          <Skeleton width="40%" height="24px" />
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <Skeleton circle width="40px" height="40px" />
          <Skeleton width="60px" height="24px" />
        </div>
      </div>
    );
  }

  return (
      <div className="bg-ccWhite rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{width:"250px"}}>
        <a href={listing.listingLink} className="block">
          <div className="relative">
            <img 
              src={image} 
              alt={listing.name || defaultText} 
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button className="p-1 text-ccBlack" title="Edit" onClick={handleEdit}>
                <i className="fas fa-ellipsis-h text-lg"></i>
              </button>
              <button className="p-1 text-ccBlack" title="Delete" onClick={() =>handleDelete(initialData?.id)}>
                <i className="fas fa-trash text-lg"></i>
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate text-gray-800">{listing.name || defaultText}</h3>
            <p className="text-sm text-gray-600 mb-2">{listing.description || defaultText}</p>
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-green-600">{listing.price || defaultText}</span>
              <span className="text-sm text-gray-500 line-through ml-2">{listing.originalPrice || defaultText}</span>
            </div>
            <div className="flex flex-wrap text-sm text-gray-600 mb-2">
              <span className="mr-2">Size: <span className="font-medium text-gray-800">{listing.clothingItemSize || defaultText}</span></span>
              <span>Brand: <span className="font-medium text-gray-800">{listing.brand || defaultText}</span></span>
            </div>
            <div className="flex flex-wrap text-sm text-gray-600 mb-2">
              <span className="mr-2">Type: <span className="font-medium text-gray-800">{listing.type || defaultText}</span></span>
              <span>Condition: <span className="font-medium text-gray-800">{listing.itemCondition || defaultText}</span></span>
            </div>
            <div className="flex flex-wrap text-sm text-gray-600 mb-2">
              <span className="mr-2">Gender: <span className="font-medium text-gray-800">{listing.gender ? (listing.gender === 'MALE' ? '♂' : '♀') : defaultText}</span></span>
              <span>Status: <span className="font-medium text-gray-800">{listing.status || defaultText}</span></span>
            </div>
            <div className="flex flex-wrap text-sm text-gray-600 mb-2">
              <span>Source: <span className="font-medium text-gray-800">{listing.source || defaultText}</span></span>
            </div>
          </div>
        </a>
        <div className="flex items-center justify-between p-4 border-t">
          {/* <a href={`/profile/${listing.sellerName}`} className="flex items-center">
            <Avatar username={listing.userName} profilePicture={listing.sellerImage} />
            <span className="ml-2 text-sm text-gray-700">{listing.userName}</span>
          </a> */}
          <div className="flex space-x-2">
            <button className="relative p-2 text-ccGreen hover:text-blue-600" title="Bids">
              <i className="fas fa-gavel text-lg"></i>
              <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-ccWhite bg-red-600 rounded-full">0</span>
            </button>
            <button className="relative p-2 text-ccGreen hover:text-blue-600" title="Trades">
              <i className="fas fa-exchange-alt text-lg"></i>
              <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-ccWhite bg-red-600 rounded-full">0</span>
            </button>
            <button className="relative p-2 text-ccGreen hover:text-blue-600" title="Messages">
              <i className="fas fa-envelope text-lg"></i>
              <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-ccWhite bg-red-600 rounded-full">0</span>
            </button>
          </div>
        </div>
      </div>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.shape({
    photoUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    originalPrice: PropTypes.string,
    clothingItemSize: PropTypes.string,
    brand: PropTypes.string,
    sellerImage: PropTypes.string,
    sellerName: PropTypes.string,
    listingLink: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    status: PropTypes.string,
    itemCondition: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired
};

export default ListingCard;