import React from 'react';

const categories = [
  {
    name: 'Men',
    href: '/browse/Men',
    imgSrc: 'https://example.com/men-image.png',
  },
  {
    name: 'Women',
    href: '/browse/Women',
    imgSrc: 'https://example.com/women-image.png',
  },
  {
    name: 'All Lisitings',
    href: '/browse/All',
    imgSrc: 'https://example.com/women-image.png',
  },
  
];

const Categories = () => {
  return (
    <div className=" bg-ccGreen rounded-lg p-8">
      <span className="font-allumin_std 3xl:text-32 2xl:text-28 xl:text-28 lg:text-28 md:text-28 text-2xl mr-4 ml-3 cursor-default">
        <strong>Categories</strong>
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-6 my-4 mx-2 p-16 justify-center">
        {categories.map((category) => (
          <a key={category.name} href={category.href}>
            <div className="h-44 md:h-160 xl:h-268 2xl:h-268 3xl:h-268 bg-ccWhite rounded-2xl p-3 cursor-pointer hover:shadow-2xl">
              <img
                src={category.imgSrc}
                alt={category.name}
                className="lg:mt-2 md:mt-3.5 mt-2.5 h-24 w-116 md:w-188 md:h-24 lg:w-188 lg:h-24 xl:h-164 xl:w-48 2xl:h-164 2xl:w-56 3xl:h-164 m-auto object-none object-center"
              />
              <p className="flex justify-center text-center 3xl:text-base 2xl:text-base xl:text-base lg:text-sm md:text-sm text-sm font-bold font-sans lg:mt-3 mt-2 overflow-clip overflow-hidden product-category-name">
                {category.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;