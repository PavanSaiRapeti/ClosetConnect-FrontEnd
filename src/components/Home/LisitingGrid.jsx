import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from './components/ListingCard';
import { setPageLoading, setPopup } from 'store/actions/commonAction';
import { getUserClothingItemsRequest } from 'store/actions/ItemAction';
import Skeleton from '../common/Skeleton';
import CustomPagination from '../customPagination';
import { handleTrigger } from 'utils/utils';

const ListingGrid = ({ page, setPage,isSmall=false, selectedItem={}, setSelectedItem={}}) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState(4);
  const { items, error } = useSelector(state => state.item);
  const userId = useSelector(state => state.user.userId);
  const pageLoading = useSelector((state) => state.common.pageLoading);
  const [updatedItems, setUpdatedItems] = useState([]);

  useEffect(() => {
   setUpdatedItems(items);
  }, [items]);

  console.log('listing', items);
  useEffect(() => {
    if (error) {
        handleTrigger(true,dispatch,setPopup({
          title: 'error',
          content: error || 'An error occurred while fetching the listings.'
        }));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (items?.content?.length >= 0) {
      dispatch(setPageLoading(false));
    }
  }, [items?.content?.length]);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
    dispatch(getUserClothingItemsRequest(userId, size, selectedPage));
  };
  if(isSmall){
    return (
      <div className="overflow-y-auto max-h-80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pageLoading ? (
            <div className="bg-ccWhite rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ width: "250px" }}>
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
          ) : (updatedItems?.content?.map((listing, index) => (
            <div 
              key={listing.id} 
              className={`cursor-pointer ${selectedItem === listing.id ? 'border-2 border-blue-500' : ''}`} 
              onClick={() => setSelectedItem(listing.id)}
            >
              <ListingCard listing={listing} isLoading={false} guestId={userId} isSmall={isSmall} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
          )))
          }

          {(updatedItems?.content?.length === 0 && !pageLoading) && (
            <div className="dummy-value text-center text-ccGray-500">
              No items found. Please try a different search.
            </div>
          )}
        </div>
        <CustomPagination
          currentPage={page}
          totalPages={items?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    )
  }

  return (
    <div className="p-6 bg-ccWhite rounded-lg shadow-lg">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pageLoading ? (
            <div className="bg-ccWhite rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ width: "250px" }}>
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
          ) : (updatedItems?.content?.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} isLoading={false} guestId={userId} isSmall={isSmall} />
          )))
          }

          {(updatedItems?.content?.length === 0 && !pageLoading) && (
            <div className="dummy-value text-center text-ccGray-500">
              No items found. Please try a different search.
            </div>
          )}
        </div>
        <CustomPagination
          currentPage={page}
          totalPages={items?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListingGrid;