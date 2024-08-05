import React from 'react';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 border rounded mx-1 ${currentPage === i ? 'bg-purple-700 text-white' : 'bg-white text-purple-700'}`}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        className="px-3 py-1 border rounded mx-1 bg-white text-purple-700"
        disabled={currentPage === 0}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        className="px-3 py-1 border rounded mx-1 bg-white text-purple-700"
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;