import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const ListingCard = ({ 
  imageSrc, 
  imageAlt, 
  title, 
  price, 
  originalPrice, 
  size, 
  brand, 
  sellerImage, 
  sellerName, 
  listingLink 
}) => {
  return (
      <div className="bg-ccWhite rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{width:"250px"}}>
        <a href={listingLink} className="block">
          <div className="relative">
            <Image 
              src={imageSrc} 
              alt={imageAlt} 
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-green-600">{price}</span>
              <span className="text-sm text-gray-500 line-through ml-2">{originalPrice}</span>
            </div>
            <div className="flex flex-wrap text-sm text-gray-600 mb-2">
              <span className="mr-2">Size: {size}</span>
              <span>Brand: {brand}</span>
            </div>
          </div>
        </a>
        <div className="flex items-center justify-between p-4 border-t">
          <a href={`/closet/${sellerName}`} className="flex items-center">
            <Image 
              src={sellerImage} 
              alt={sellerName} 
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">{sellerName}</span>
          </a>
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
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string,
  size: PropTypes.string,
  brand: PropTypes.string,
  sellerImage: PropTypes.string,
  sellerName: PropTypes.string,
  listingLink: PropTypes.string.isRequired,
};

export default ListingCard;