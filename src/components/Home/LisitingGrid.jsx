import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from './components/ListingCard';
import ReactPaginate from 'react-paginate';
import { searchUserItemRequest } from 'store/actions/searchItemAction';

const ListingGrid = () => {
  const { loading, data, error } = useSelector(state => state.clothingItems);

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && (
        <div>
          <div className="listing-grid grid grid-cols-5 gap-4">
            {data.content.map((listing, index) => (
              <ListingCard key={index} {...listing} />
            ))}
            {data.content.length === 0 && (
              <div className="dummy-value">
                No items found. Please try a different search.
              </div>
            )}
          </div>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={data.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination flex justify-center mt-4'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName={'mx-1'}
            pageLinkClassName={'px-3 py-1 border rounded'}
            previousClassName={'mx-1'}
            nextClassName={'mx-1'}
            previousLinkClassName={'px-3 py-1 border rounded'}
            nextLinkClassName={'px-3 py-1 border rounded'}
            activeLinkClassName={'bg-blue-500 text-white'}
          />
        </div>
      )}
    </div>
  );
};

export default ListingGrid;