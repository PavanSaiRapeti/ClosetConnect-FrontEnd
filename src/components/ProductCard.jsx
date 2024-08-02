import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';

const ProductCard = ({ product, image }) => {
  const token = useSelector(state => state.auth.token);

  useEffect(async () => {
    if (product?.id) {
      try {
        const response = await getItemImage(product.id, token);
        setImage(response);
        console.log('==>image', image);
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
    // dispatch(setPageLoading(false));
  }, [product]);

  return (
    <div className="font-sans p-8">
      <div className="flex justify-center">
        <div className="flex w-3/4 space-x-8">
          <div className="w-1/2">
            <img src={image} alt="Product" className="w-[600px] h-[400px] object-cover rounded"  />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar username={product.userFullName} profilePicture={product.sellerImage} />
                  <div>
                    <p className="text-sm font-semibold">{product.userFullName}</p>
                    {/* <p className="text-xs text-gray-500">Updated 8 secs ago</p> */}
                  </div>
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">{product.brand}</p>
              <div className="flex items-center mb-4">
                <p className="text-2xl font-bold text-red-500 mr-2">{product.price || 'N/A'}</p>
                <p className="text-lg text-gray-500 line-through">{product.originalPrice || 'N/A'}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold mr-2">TYPE :</span>
                <button className="border border-gray-300 px-2 py-1 rounded text-sm">{product.type}</button>
              </div>
            </div>
            <div>
              <div className="flex space-x-4 mb-4">
                <button className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded">Bid</button>
                <button className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded">Trade</button>
              </div>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded w-full mb-4"><span className="font-bold">Message</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;