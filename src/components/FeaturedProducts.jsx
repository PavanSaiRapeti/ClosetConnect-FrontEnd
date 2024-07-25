import React, { useRef, useEffect } from 'react'
import Glider from 'glider-js'
import 'glider-js/glider.min.css'
import ListingCard from './Home/components/ListingCard'
import { ReviewCard } from './Home/ReviewSection'

const FeaturedProducts = ({ products, type, title }) => {
  const gliderTrackRef = useRef(null)

  useEffect(() => {
    if (gliderTrackRef.current) {
      new Glider(gliderTrackRef.current, {
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: false,
        dots: `#dots-${title.replace(/\s+/g, '-')}`,
        arrows: {
          prev: ` .glider-prev-${title.replace(/\s+/g, '-')}`,
          next: `.glider-next-${title.replace(/\s+/g, '-')}`,
        },
      })
    }
  }, [title])

  const renderProductCard = (product) => {
    switch (type) {
      case 'listing':
        return <ListingCard key={product.id} {...product} />
      case 'review':
        return <ReviewCard key={product.id} review={product} />
      default:
        return null
    }
  }

  return (
    <div style={{ width: '100%' }} className='w-11/12 pt-8 relative'>
      <div className='mb-6 flex justify-center'>
        <span className='font-bold text-2xl md:text-28 3xl:text-32 font-allumin_std text-monochromes text-32 leading-8 cursor-default'>
          {title}
        </span>
      </div>
      {products && products.length > 0 ? (
        <>
        <div id={`glider-track-container-${title.replace(/\s+/g, '-')}`} className='glider-container'>
          <div ref={gliderTrackRef} className='glider flex flex-row' style={{ width: '100%', padding: '3rem', gap: '10rem' }}>
            {products.map(renderProductCard)}
          </div>
        </div>
        <div className='flex justify-center items-center' style={{ position: 'absolute', top: '13%', height: '81%', width: '80px', left: 0 }}>
        <button className={`glider-prev glider-prev-${title.replace(/\s+/g, '-')} focus:outline-none hidden-mobile`} type='button'>
          <img src='https://cdn.mscdirect.com/global/v2/img/sliders/slider-arrow-left.svg' alt='scroll products left' />
        </button>
      </div>
      <div className='flex justify-center items-center' style={{ position: 'absolute', height: '82%', right: '20px', bottom: '5.9%', width: '80px' }}>
        <button className={`glider-next glider-next-${title.replace(/\s+/g, '-')} hidden-mobile focus:outline-none`} type='button'>
          <img src='https://cdn.mscdirect.com/global/v2/img/sliders/slider-arrow-right.svg' alt='scroll products right' />
        </button>
      </div>
      <div id={`dots-${title.replace(/\s+/g, '-')}`} className='glider-dots'></div>
      </>
      ) : (
        <div className='flex flex-col items-center justify-center h-full pt-28 pb-28'>
          <p className='text-lg text-gray-500'>No products available at the moment.</p>
          <p className='text-sm text-gray-400'>Please check back later.</p>
        </div>
      )}
      
    </div>
  )
}

export default FeaturedProducts;       
