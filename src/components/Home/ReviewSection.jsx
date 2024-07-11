import React from 'react';

const ReviewSection = () => {
  return (
    <div className="review-section">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="review-list">
        <div className="review-item">
          <div className="rating">
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-gray-300"><i className="fas fa-star"></i></span>
          </div>
          <p className="review-text">This product is amazing! I love it.</p>
          <p className="review-author">- John Doe</p>
        </div>
        <div className="review-item">
          <div className="rating">
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-gray-300"><i className="fas fa-star"></i></span>
            <span className="text-gray-300"><i className="fas fa-star"></i></span>
          </div>
          <p className="review-text">Good product, but could be better.</p>
          <p className="review-author">- Jane Doe</p>
        </div>
        <div className="review-item">
          <div className="rating">
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-gray-300"><i className="fas fa-star"></i></span>
            <span className="text-gray-300"><i className="fas fa-star"></i></span>
            <span className="text-gray-300"><i className="fas fa-star"></i></span>
          </div>
          <p className="review-text">Not impressed with this product.</p>
          <p className="review-author">- Bob Smith</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;


