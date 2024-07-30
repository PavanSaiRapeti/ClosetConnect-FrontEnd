import React from 'react';
import ListingCard from '@/components/Home/components/ListingCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import { wrapper } from 'store';

const ItemDetails = ({ item,listing }) => {

  if (!item) {
    return <div className="p-6 bg-ccWhite rounded-lg shadow-lg">Loading...</div>;
  }

  return (
    <div className="p-6 bg-ccWhite rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <ListingCard {...item} />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{item.description}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Details</h2>
        <ul>
          <li><strong>Price:</strong> {item.price}</li>
          <li><strong>Original Price:</strong> {item.originalPrice}</li>
          <li><strong>Size:</strong> {item.size}</li>
          <li><strong>Brand:</strong> {item.brand}</li>
        </ul>
      </div>
      <FeaturedProducts products={listing} title={'Featured Listing'} type={'listing'}/>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { slug } = params;
  // await store.dispatch(fetchItemDetails(slug));
  const item = store.getState().item.data;

  return {
    props: {
      item: item || null,
      listing: listing || null,
    },
  };
});




