import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from './components/ListingCard';
import ReactPaginate from 'react-paginate';
import { handleTrigger } from 'utils/utils';
import { setPopup } from 'store/actions/commonAction';
import { getUserClothingItemsRequest } from 'store/actions/ItemAction';

const ListingGrid = ({page, setPage}) => {
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector(state => state.item);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (error) {
      dispatch(setPopup({
        title: 'Error',
        content: error || 'An error occurred while fetching the listings.'
      }));
    }
  }, [error, dispatch]);

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="p-6 bg-ccWhite rounded-lg shadow-lg">
        <div>
          <div className="listing-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items?.content.map((listing, index) => (
              <ListingCard key={index} listing={listing} isLoading={false} />
            ))}
            {(items?.content.length === 0 && !loading) && (
              <div className="dummy-value text-center text-ccGray-500">
                No items found. Please try a different search.
              </div>
            )}
          </div>
          <ReactPaginate
          previousLabel={
              <img src="https://www.svgrepo.com/show/87499/left-arrow.svg" alt="scroll products left" style={{  width: '20px', height: '20px' }} />
          }
          nextLabel={
              <img src="https://www.svgrepo.com/show/87499/left-arrow.svg" alt="scroll products right" style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
          }
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={items?.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex justify-center mt-6'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageClassName={'mx-1'}
          pageLinkClassName={'px-3 py-1 border border-ccGray-300 rounded bg-black text-ccGray-700 hover:bg-ccPink transition duration-300 flex items-center justify-center'}
          previousClassName={'mx-1'}
          nextClassName={'mx-1'}
          previousLinkClassName={'px-3 py-1 border border-ccGray-300 rounded text-ccGray-700 hover:bg-ccBlue-100 transition duration-300 flex items-center justify-center'}
          nextLinkClassName={'px-3 py-1 border border-ccGray-300 rounded text-ccGray-700 hover:bg-ccBlue-100 transition duration-300 flex items-center justify-center'}
          activeLinkClassName={'bg-ccBlue-500 text-white'}
        />
        </div> 

    </div>
  );
};

export default ListingGrid;