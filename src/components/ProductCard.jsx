import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';

const ProductCard = ({ product, image, onTrade }) => {
  const token = useSelector(state => state.auth.token);

  useEffect(async () => {
    console.log('product==>',product,token);
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
    <div className="font-sans p-8 border border-white-500 bg-white rounded-lg">
      <div className="flex justify-center">
        <div className="flex w-3/4 space-x-8">
          <div className="w-1/2">
            <img src={image} alt="Product" className=" w-[600px] h-[400px] object-contain rounded" />
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
              <p className="text-sm text-gray-500 mb-4">{product.gender}</p>
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold mr-2">TYPE :</span>
                <span className="border border-gray-300 px-2 py-1 rounded text-sm">{product.type}</span>
              </div>
              <div className="flex mb-4 flex-col">
                <span className="text-sm font-semibold mr-2">Description :</span>
                <span className="text-lg text-gray-500 mb-4">{product.description}</span>
                <button className="bg-ccBlack text-white px-4 py-2 rounded w-full mb-4" onClick={onTrade}><span className="font-bold">Trade Now</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;