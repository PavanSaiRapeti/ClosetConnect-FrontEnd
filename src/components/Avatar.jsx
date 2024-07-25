import React from 'react';

const Avatar = ({ username }) => {
  const firstLetter = username?.charAt(0)?.toUpperCase() || 'CC';

  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-ccWhite text-xl font-bold">
      {firstLetter}
    </div>
  );
};

export default Avatar;