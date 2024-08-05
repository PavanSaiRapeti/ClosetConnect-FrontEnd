import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from './components/ListingCard';
import { setPageLoading, setPopup } from 'store/actions/commonAction';
import Skeleton from '../common/Skeleton';
import CustomPagination from '../customPagination';
import { handleTrigger } from 'utils/utils';
import TradeModal from '@/components/TradeModal';

const ListingGrid = ({ page, setPage, isSmall = false, selectedItem = {}, setSelectedItem = {}, userId ,guestUser=null }) => {
  const dispatch = useDispatch();
  const { items, error } = useSelector(state => state.item);
  const pageLoading = useSelector((state) => state.common.pageLoading);
  
  const [currentItems, setCurrentItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (items?.content) {
      const startIndex = (page) * items?.pageable?.pageSize;
      const endIndex = startIndex + items?.pageable?.pageSize;
      setCurrentItems(items.content.slice(startIndex, endIndex));
    }
  }, [items, page, items?.pageable?.pageSize]);



  useEffect(() => {
    if (error) {
      handleTrigger(true, dispatch, setPopup({
        title: 'Error',
        content: error || 'An error occurred while fetching the listings.'
      }));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (items?.content?.length >= 0) {
      dispatch(setPageLoading(false));
    }
  }, [items?.content?.length, dispatch]);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };

  const openModal = (listing) => {
    console.log('tri==>', listing);
    // setImage(image);
    setSelectedListing(listing);
    setIsModalVisible(true);
  };

  useEffect(() => {
    console.log('isModalVisible==>', currentItems);
  }, [currentItems]);

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedListing(null);
  };

  if (isSmall) {
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
          ) : (currentItems?.map((listing) => (
            <div
              key={listing.id}
              className={`cursor-pointer ${selectedItem === listing.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setSelectedItem(listing.id)}
            >
              <ListingCard listing={listing} isLoading={false} guestId={userId} isSmall={isSmall} selectedItem={selectedItem} setSelectedItem={setSelectedItem} openModal={() => openModal(listing)} />
            </div>
          )))
          }

          {(currentItems?.length === 0 && !pageLoading) && (
            <div className="dummy-value text-center text-ccGray-500">
              No Uploaded items found.
            </div>
          )}
        </div>
        <CustomPagination
          currentPage={page}
          totalPages={items?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
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
          ) : (currentItems?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} isLoading={false} guestId={userId} isSmall={isSmall} handleOpenModal={() => openModal(listing)} guestUser={guestUser} />
          )))
          }

          {(items?.content?.length === 0 && !pageLoading) && (
            <div className="dummy-value text-center text-ccGray-500">
              Your Closet Is Empty. Upload items to get started.
            </div>
          )}
        </div>
        <CustomPagination
          currentPage={page}
          totalPages={items?.totalPages}
          onPageChange={handlePageChange}
        />
        {selectedListing && (
          <TradeModal isVisible={isModalVisible} onClose={closeModal} product={selectedListing} image={image} guestId={userId} />
        )}
      </div>
    </div>
  );
};

export default ListingGrid;