import React, { useState, useEffect } from 'react';
import FilterComponent from './components/FilterComponent';
import Avatar from '../Avatar';
import { useSelector } from 'react-redux';
import Skeleton from '../common/Skeleton';
import { setPageLoading } from 'store/actions/commonAction';

const ProfileSection = ({ 
  email, 
  name, 
  role, 
  gender,
  profilePicture 
}) => {
  const [filters, setFilters] = useState({
    type: 'All Types',
    category: 'All Categories',
    size: 'All Sizes',
    priceRange: 'All Prices',
    shipping: 'All Items',
    condition: 'All Conditions',
    availability: 'All Items'
  });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pageLoading = useSelector((state) => state.common.pageLoading);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
    // Send request with updated filters
    // Example: sendRequest(filters);
  };

  if (pageLoading) {
    return (
      <div className="profile-section w-full max-w-xs mx-auto p-6 bg-ccWhite shadow-lg rounded-lg">
        <div className="flex items-center mb-6">
          <Skeleton circle={true} height={64} width={64} />
          <div className="ml-4">
            <Skeleton width={128} height={24} />
            <Skeleton width={192} height={16} />
            <Skeleton width={96} height={16} />
            <Skeleton width={96} height={16} />
            <Skeleton width={96} height={16} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form>
      <div className="profile-section w-full max-w-xs mx-auto p-6 bg-ccWhite shadow-lg rounded-lg">
        <div className="flex items-center mb-6">
          <Avatar username={name} profilePicture={profilePicture} />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
            <p className="text-gray-600 mb-1">{email}</p>
            <p className="text-gray-500">Role: {role}</p>
            <p className="text-gray-500">Gender: {gender}</p>
            <p className="text-gray-500">Joined: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileSection;