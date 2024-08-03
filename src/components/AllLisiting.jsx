import React, { useEffect, useState } from 'react';
import ListingCard from './Home/components/ListingCard';
import { setPageLoading, setPopup } from 'store/actions/commonAction';
import Skeleton from './common/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getUserClothingItemsRequest } from 'store/actions/ItemAction';
import ReactPaginate from 'react-paginate';
import CustomPagination from './customPagination';
import Link from 'next/link';

const AllLisiting = ({title}) => {

    const dispatch = useDispatch();
    const [size,setSize] = useState(2);
    const allItems = useSelector(state => state.search.allItems);
    const userId = useSelector(state => state.user.userId);
    const pageLoading = useSelector((state) => state.common.pageLoading);
    const [lisitingArray, setLisitingArray] = useState(allItems);


useEffect(() => {
    setLisitingArray(allItems);
}, [allItems]);


    // useEffect(() => {
    //   if (error) {
    //     dispatch(setPopup({
    //       title: 'Error',
    //       content: error || 'An error occurred while fetching the listings.'
    //     }));
    //   }
    // }, [error, dispatch]);
  
    useEffect(() => {
      if(lisitingArray?.content?.length>=0){
        dispatch(setPageLoading(false));
      }
    }, [lisitingArray?.content?.length]);
  
    const handlePageChange = ({ selected }) => {
      setPage(selected);
      dispatch(getUserClothingItemsRequest(userId, size, selected));
    };
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Overlay */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/home">
          <a className="hover:underline">Home</a>
        </Link> / <Link href={`/${title}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </nav>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isFilterOpen ? 'block' : 'hidden'}`}
        onClick={toggleFilter}
      ></div>

      {/* Filter Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button className="text-gray-600" onClick={toggleFilter}>
            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-close" viewBox="0 0 64 64">
              <path d="M19 17.61l27.12 27.13m0-27.12L19 44.74" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Colour</h3>
            <div className="flex space-x-2">
              <span className="color-swatch color-swatch--filter color-swatch--black" style={{ backgroundColor: 'black' }}></span>
              <span className="color-swatch color-swatch--filter color-swatch--brown" style={{ backgroundColor: 'brown' }}></span>
              <span className="color-swatch color-swatch--filter color-swatch--pink" style={{ backgroundColor: 'pink' }}></span>
              <span className="color-swatch color-swatch--filter color-swatch--striped" style={{ backgroundColor: 'gray' }}></span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Size</h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Small</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Medium</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Large</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Styles</h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Style 1</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Style 2</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Collections</h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Collection 1</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Collection 2</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="border border-gray-300 rounded px-4 py-2 flex items-center" onClick={toggleFilter}>
            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-filter mr-2" viewBox="0 0 64 64">
              <path d="M48 42h10M48 42a5 5 0 1 1-5-5 5 5 0 0 1 5 5zM7 42h31M16 22H6M16 22a5 5 0 1 1 5 5 5 5 0 0 1-5-5zM57 22H26" />
            </svg>
            Filter
          </button>
          <span>{lisitingArray?.content?.length || 0} products</span>
          <select className="border border-gray-300 rounded p-2">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {pageLoading ? (
            <div className="bg-ccWhite rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ width: "350px" }}>
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
          ) : (lisitingArray?.content?.map((listing, index) => (
            <div key={listing.id} className="flex justify-center text-center">
               <ListingCard key={listing.id} listing={listing} isLoading={false} guestId={listing?.userId} />
                </div>
            
          )))
          }
            {(lisitingArray?.content?.length === 0 && !pageLoading) && (
            <div className="dummy-value text-center text-ccGray-500">
              No Uploaded items found.
            </div>
          )}
           
        </div>
        <CustomPagination totalPages={lisitingArray?.totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default AllLisiting;