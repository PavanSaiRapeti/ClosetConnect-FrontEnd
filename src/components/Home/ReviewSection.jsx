import React from 'react';



export const ReviewCard = ({ review }) => (
  <div className="border p-4 rounded-lg shadow-md mb-4">
    <div className="flex items-center mb-2">
      <span className="text-yellow-500 text-lg">
        {'⭐'.repeat(review.rating)}
      </span>
    </div>
    <h3 className="font-bold text-xl mb-1">{review.title}</h3>
    <p className="text-gray-700 mb-2">{review.content}</p>
    <p className="text-gray-500 italic">- {review.name}</p>
  </div>
);

const ReviewSection = ({reviews}) => (
  <section className="my-8 p-4">
    <h2 className="text-3xl font-bold mb-6">Our Customers Love Us!</h2>
    <div>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
    <div className="mt-6">
      <h3 className="text-2xl font-bold">Share Your Experience!</h3>
      <p>We&apos;d love to hear about your experience with our services. Leave us a review and let us know how we&apos;re doing!</p>
    </div>
  </section>
);

export default ReviewSection;


