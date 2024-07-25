
import React from 'react';
import ListingCard from './components/ListingCard';

const ListingGrid = () => {
  const listing = {
    imageSrc: 'https://di2ponv0v5otw.cloudfront.net/posts/2024/01/16/65a723d824237ab76bdea5d3/s_65a726de24237a5bbcdec102.jpg',
    imageAlt: 'Lululemon burnout OM lightweight/oversized dewberry manifesto scarf/wrap/blanket',
    title: 'Lululemon burnout OM lightweight/oversized dewberry manifesto scarf/wrap/blanket',
    price: 'C$60',
    originalPrice: 'C$128',
    size: 'US OS',
    brand: 'lululemon athletica',
    sellerImage: 'https://di2ponv0v5otw.cloudfront.net/users/2020/01/05/3/t_5e11c884acb24b69c3edb360.jpg',
    sellerName: 'xxthegirlxx',
    listingLink: '/listing/Lululemon-burnout-OM-lightweightoversized-dewberry-manifesto-scarfwrapblanket-65a723d824237ab76bdea5d3',
  };
  return (
    <div className="listing-grid grid grid-cols-5 gap-4">
     <ListingCard {...listing} />
     <ListingCard {...listing} />
     <ListingCard {...listing} />
     <ListingCard {...listing} />
     <ListingCard {...listing} />
     <ListingCard {...listing} />
     <ListingCard {...listing} />
     <ListingCard {...listing} />
    </div>
  );
};

export default ListingGrid;