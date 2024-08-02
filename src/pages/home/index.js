import FilterSidebar from "@/components/AllLisiting";
import Categories from "@/components/Categories";
import Skeleton from "@/components/common/Skeleton";
import FeaturedProducts from "@/components/FeaturedProducts";
import ListingCard from "@/components/Home/components/ListingCard";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Layout from "pages/Layout";
import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "store";
import { setPageLoading } from "store/actions/commonAction";
import { setToken, setUserId } from "store/actions/userAction";
import { SET_USER_ID, VALIDATE_TOKEN_SUCCESS } from "store/types/apiActionTypes";
import { checkAuth } from "utils/authHelpers";
import { getAllItems, getAllItemsLatest } from "utils/utils";

// Hero Section Component with Carousel
const HeroSection = () => {
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1560095275-b6fe3ebb506d?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

    <section className="relative text-center p-10" style={{ fontFamily: "Ubuntu" }}>
      {slides.length === 0 || pageLoading ? (
        <Skeleton className="w-full h-96 rounded-lg" />
      ) : (
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-96 object-cover rounded-lg" />
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
    image: 'https://via.placeholder.com/600x400',
  },
  {
    title: 'Women',
    link: 'browse/Women',
    image: 'https://via.placeholder.com/600x400',
  },
  {
    title: 'Tops',
    link: 'browse/Tops',
    image: 'https://via.placeholder.com/600x400',
  },
  {
    title: 'Bottoms',
    link: 'browse/Bottoms',
    image: 'https://via.placeholder.com/600x400',
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
      return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <PromoGridItem />
       </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What&apos;s New</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.content.slice(0, 8).map((product) => (
               <div key={product.id} className="flex justify-center text-center">
                <ListingCard key={product.id} listing={product} guestId={userId}/>
                </div>
              ))}
        </div>
      </div>
    <div className="mt-8 flex justify-center">
      <button 
        className="bg-ccGreen text-white font-bold py-2 px-4 rounded hover:bg-ccDarkGreen transition duration-300"
        onClick={() => router.push('/browse/All')}
      >
        view All
      </button>
    </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-ccWhite p-4 text-center" style={{ fontFamily: "Ubuntu" }}>
      <p>&copy; 2024 CloseConnect. All rights reserved.</p>
    </footer>
  );
};


const Home = ({listing,reviews,user,allItemsLatest}) => {
  const allItems = useSelector(state=>state.search.allItems);
  console.log('allItems',allItems);
  return (
    <Layout user={user}>
        <div className="flex flex-col items-center justify-center ">
        <div className="p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold mb-2">Welcome, {user ? user.name : 'Guest'}</h1>
        </div>
      </div>
      <HeroSection />
      <ProductShowcase products={allItemsLatest||[]} />
      <Categories />
      <FeaturedProducts products={reviews} title={'Reviews'} type={'review'} />
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
  if(allItems){
   store.dispatch({
     type: 'CREATE_ALL_ITEMS',
     payload: allItems
   });
  }
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