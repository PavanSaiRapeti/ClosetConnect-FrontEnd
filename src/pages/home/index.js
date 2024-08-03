import Skeleton from "@/components/common/Skeleton";
import ListingCard from "@/components/Home/components/ListingCard";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Layout from "pages/Layout";
import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "store";
import { setPageLoading } from "store/actions/commonAction";
import { setToken, setUserId } from "store/actions/userAction";
import { VALIDATE_TOKEN_SUCCESS } from "store/types/apiActionTypes";
import { checkAuth } from "utils/authHelpers";
import { getAllItems, getAllItemsLatest } from "utils/utils";

const reviews = [
  {
    id: 1,
    text: 'CloseConnect is a game-changer! I found so many great deals on items. Highly recommend!',
    reviewer: 'Alex P.',
    stars: 5,
  },
  {
    id: 2,
    text: 'Trading my items on CloseConnect was so easy and convenient. I made extra cash and cleared out my space!',
    reviewer: 'Jamie L.',
    stars: 5,
  },
  {
    id: 3,
    text: 'I love the community aspect of CloseConnect. Trading items with other students is fun and sustainable!',
    reviewer: 'Taylor R.',
    stars: 5,
  },
  // Add more reviews as needed
];

const CustomerReviews = () => {
  return (
    <div className="text-center p-12 bg-white">
      <h2 className="text-4xl font-bold text-black mb-10">CUSTOMER REVIEWS</h2>
      <div className="flex flex-wrap justify-center">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 m-4 w-full md:w-1/3 shadow-lg">
            <blockquote className="text-gray-800 text-lg mb-4">
              <span className="text-2xl text-black">“</span>
              {review.text}
              <span className="text-2xl text-black">”</span>
            </blockquote>
            <div className="text-pink-400 mb-4">
              {Array(review.stars).fill().map((_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
            <p className="text-gray-500">— {review.reviewer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Section Component with Carousel
const HeroSection = () => {
  
  const slides = [
    {
      image: '/assets/banner.jpg',
      title: "Welcome to CloseConnect",
      description: "The ultimate thrifting platform for college students."
    },
    {
      image: "https://images.unsplash.com/photo-1524578271613-e1ac182ffa2f?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sell Your Clothes",
      description: "Easily list your items and make extra cash."
    },
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Trade with Peers",
      description: "Swap items with other students and refresh your wardrobe."
    }
  ];
  
const pageLoading =useSelector(state=>state.common.pageLoading)
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (

    <section className="relative text-center" style={{ fontFamily: "Ubuntu" }}>
      {slides.length === 0 || pageLoading ? (
        <Skeleton className="w-full h-full rounded-lg" />
      ) : (
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full  object-cover rounded-lg"  id="hero-image"/>
      )}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-ccWhite">
        {slides.length === 0 || pageLoading ? (
          <>
            <Skeleton className="h-10 w-3/4 mb-4 rounded" />
            <Skeleton className="h-6 w-1/2 mb-4 rounded" />
            <Skeleton className="h-10 w-1/4 rounded-full" />
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h2>
            <p className="text-lg mb-4">{slides[currentSlide].description}</p>
            <button
              onClick={() => window.location.href = '/about'}
              className="border border-white bg-ccWhite text-ccBlack  px-4 py-2 rounded-full font-semibold"
            >
              Learn More
            </button>
            <div className="mt-4">
              <button onClick={prevSlide} className="mx-2 p-2 border border-ccWhite text-ccWhite rounded-full">&lt;</button>
              <button onClick={nextSlide} className="mx-2 p-2 border border-ccWhite text-ccWhite rounded-full">&gt;</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const categories = [
  {
    title: 'Men',
    link: 'browse/Men',
    image: '/assets/men.png', // Update the image path
  },
  {
    title: 'Women',
    link: 'browse/Women',
    image: '/assets/women.png',
  },
  {
    title: 'Tops',
    link: 'browse/Tops',
    image: '/assets/top.png',
  },
  {
    title: 'Bottoms',
    link: 'browse/Bottoms',
    image: '/assets/bottom.png',
  },
];

const PromoGridItem = () => {
  const router = useRouter();
  return (
    <>
    {categories.map((category, index) => (
       <div key={index} className="relative w-full h-full border-4 border-white" onClick={()=>router.push(category.link)}>
      <div className="relative w-full h-full border-4 border-white">
        <img
          className="w-full h-full object-cover"
          src={category.image}
          alt={category.title}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <p className="text-lg">Listings</p>
        </div>
      </div>
    </div>
    ))}
    </>
   
  );
};

const ProductShowcase = ({products}) => {
      const userId = useSelector(state=>state.user.userId);
      const router = useRouter();
      console.log('products==>',products)
      return (
        
    <div className="w-full mb-8">
        <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">What&apos;s New</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.content.slice(0, 8).map((product) => (
               <div key={product.id} className="flex justify-center text-center">
                <ListingCard key={product.id} listing={product} guestId={product?.userId}/>
                </div>
              ))}
        </div>
      </div>
    <div className="mt-8 flex justify-center">
      <button 
        className="bg-purple-700 text-white font-bold py-2 px-4 rounded hover:bg-ccDarkGreen transition duration-300 mb-10"
        onClick={() => router.push('/browse/All')}
      >
        view All
      </button>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <PromoGridItem />
       </div>
    
    </div>
  );
};



const Home = ({listing,reviews,user,allItemsLatest}) => {
  
  const dispatch = useDispatch();
  const allItems = allItemsLatest;
  useEffect(()=>{
    dispatch({
        type: 'CREATE_ALL_ITEMS',
        payload: allItems
      });
      dispatch(setPageLoading(false));
  },[]);

  return (
    <Layout user={user}>
        <div className="flex flex-col items-center justify-center ">
        <div className="p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold mb-2">Welcome, {user ? user.name : 'Guest'}</h1>
        </div>
      </div>
      <HeroSection />
      <ProductShowcase products={allItemsLatest||[]} />
      <CustomerReviews />
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const cookies = parseCookies({ req, res });
  const { token, userId } = cookies;
  console.log('dog==>', token, userId, store);
  store.dispatch(setPageLoading(true));
  let userData = null;
  if (token) {
    const { user } = await checkAuth(token, userId);
    userData = user || null;
    if (user) {
      store.dispatch({
        type: VALIDATE_TOKEN_SUCCESS,
        payload: { user: userData, isLoggedIn: true }
      });
    store.dispatch(setUserId(userId));
    store.dispatch(setToken(token));
  }
}
  
  store.dispatch(setPageLoading(true));
  const allItems = await getAllItems(30,0);
  const allItemsLatest = await getAllItemsLatest(30,0);

  return {
    props: {
      user: userData || null,
      allItemsLatest: allItemsLatest || null,
      listing: [],
      reviews: []
    },
  }
});
export default Home;