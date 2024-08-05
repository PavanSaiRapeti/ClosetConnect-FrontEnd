import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteItem, getItemImage, handleTrigger } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginPopup, setPopup } from 'store/actions/commonAction';
import Avatar from '@/components/Avatar';

const ListingCard = ({ 
  listing,
  guestId = null,
  isSmall = false,
  handleOpenModal,
  guestUser=null
}) => {
  const user = useSelector(state => state.auth.user);
  const userId = useSelector(state => state.user.userId);
  const token = useSelector(state => state.user.token);
  const isOtherUser = parseInt(guestId) !== parseInt(userId);
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
  };

  useEffect(() => {
    const fetchData = async () => {
      if (listing?.id) {
        try {
          const response = await getItemImage(listing.id, token);
          setImage(response);
        } catch (error) {
          console.error('Failed to fetch item image:', error);
        }
      }
    };

    fetchData();
  }, [listing?.id, token, dispatch]);

  const handleDelete = async () => {
    const response = await deleteItem(listing.id, userId, token);
    if (response) {
      handleTrigger(true, dispatch, setPopup({ title: 'Success', content: 'Item deleted successfully' }));
      dispatch(getUserClothingItemsRequest(userId, 5, 0));
    } else {
      handleTrigger(true, dispatch, setPopup({ title: 'Error', content: 'Error deleting item' }));
    }
  };
  const handleTradeNow = () => {
    if(userId){
      handleOpenModal(listing,image);
    }else{
      dispatch(openLoginPopup());
    }
  }

  if (isSmall) {
    return (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <img src={image} alt={listing.name || defaultText} className="w-48 h-48 object-cover" />
        <span className="mt-2 text-center text-sm font-semibold text-gray-700">{listing.name || defaultText}</span>
      </div>
    );
  }

  return (
    <div className="space-x-2 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ width: "350px" }}>
      <a href={isOtherUser && `/All/${listing.name}?id=${listing?.id}`} className="block">
        <div className="relative">
          <img 
            src={image} 
            alt={listing.name || defaultText} 
            className="w-full h-64 object-cover"
          />
          {!isOtherUser && (
            <div className="absolute top-2 right-2 flex space-x-2">
              <button className="p-1 text-ccBlack" title="Edit" onClick={handleEdit}>
                <i className="fas fa-ellipsis-h text-lg"></i>
              </button>
              <button className="p-1 text-ccBlack" title="Delete" onClick={() => handleDelete(initialData?.id)}>
                <i className="fas fa-trash text-lg"></i>
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate text-gray-800">{listing.name || defaultText}</h3>
          <p className="text-sm text-gray-600 mb-2">{listing.description || defaultText}</p>
          <div className="flex flex-wrap text-sm text-gray-600 mb-2">
            <span className="mr-2">Gender: 
              <span className="font-medium text-gray-800">
                {listing.gender ? (
                  listing.gender === 'MALE' ? (
                    <>
                      <i className="fas fa-mars text-blue-500 ml-1"></i> Male
                    </>
                  ) : (
                    <>
                      <i className="fas fa-venus text-pink-500 ml-1"></i> Female
                    </>
                  )
                ) : defaultText}
              </span>
            </span>
            <span>Status: <span className="font-medium text-gray-800">{listing.status || defaultText}</span></span>
          </div>
          <div className="flex flex-wrap text-sm text-gray-600 mb-2">
            <span>Description: </span> 
          </div>
          <span className="font-medium text-gray-800">{listing.description || defaultText}</span>
        </div>
      </a>
      <div className="flex items-center justify-between p-4 border-t">
        {isOtherUser && <button onClick={handleTradeNow} className={`mt-2 px-4 py-2 rounded bg-ccBlack text-white`}>Trade Now</button>}
        {isOtherUser && (
          <a href={`/profile/${listing?.userId}`} className="flex items-center">
            <Avatar username={guestUser?.name ||listing?.userFullName || 'closet connect'} profilePicture={listing.sellerImage} />
            <span className="ml-2 text-sm text-gray-700">{guestUser?.name || listing?.userFullName || defaultText}</span>
          </a>
        )}
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
};

export default ListingCard;