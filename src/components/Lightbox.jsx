import React from 'react';

const Lightbox = ({ isOpen, onClose,content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" bg-ccGreen rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="text-right mt-4 mx-4 sm:mb-1">
          <i
            role="button"
            aria-hidden="true"
            className="fas fa-times text-2xl cursor-pointer"
            onClick={onClose}
          ></i>
        </div>
        <div className="customScroll sm:mt-2" style={{ maxHeight: '100vh' }}>
            {content}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;