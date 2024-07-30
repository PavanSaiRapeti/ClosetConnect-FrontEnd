import React from 'react';

const Skeleton = ({ width, height }) => {
  return (
    <div className='my-1'>
         <div className="skeleton" style={{ width, height }}></div>
    </div>
   
  );
};

export default Skeleton;