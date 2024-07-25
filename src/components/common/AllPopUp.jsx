import React from 'react';
import PropTypes from 'prop-types';

const AllPopUp = ({ isOpen, onClose, title, content, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}>
      </div>
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 md:mx-0 z-20">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <div className="p-4">
          {content}
        </div>
        {footer && (
          <div className="border-t px-4 py-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

AllPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

AllPopUp.defaultProps = {
  title: '',
  footer: null,
};

export default AllPopUp;