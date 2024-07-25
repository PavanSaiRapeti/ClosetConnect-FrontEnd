import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";
import { parseCookies } from "nookies";
import Layout from "pages/Layout";
import { checkAuth } from "utils/authHelpers";
import React, {  useState } from "react";
import { wrapper } from "store";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative text-center p-10" style={{ fontFamily: "Ubuntu" }}>
      <Image src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-96 object-cover rounded-lg" width={100} height={96}/>
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-ccWhite">
        <h2 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h2>
        <p className="text-lg mb-4">{slides[currentSlide].description}</p>
        <button
          onClick={() => window.location.href = '/about'}
          className="border border-black text-ccWhite px-4 py-2 rounded-full font-semibold"
        >
          Learn More
        </button>
        <div className="mt-4">
          <button onClick={prevSlide} className="mx-2 p-2 border border-ccWhite text-ccWhite rounded-full">&lt;</button>
          <button onClick={nextSlide} className="mx-2 p-2 border border-ccWhite text-ccWhite rounded-full">&gt;</button>
        </div>
      </div>
    </section>
  );
};



const Features = () => {
  return (
    <section className="bg-gray-100 p-10" >
      <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#7459FF" }}>Features</h2>
      <div className="flex flex-wrap justify-around">
        <div className="w-1/4 p-4 text-center">
          <h3 className="text-xl font-bold mb-2">Ratings & Reviews</h3>
          <p>Get feedback on your items from other students.</p>
        </div>
        <div className="w-1/4 p-4 text-center">
          <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
          <p>All transactions are secured with your ONE CARD.</p>
        </div>
        <div className="w-1/4 p-4 text-center">
          <h3 className="text-xl font-bold mb-2">Bids & Trades</h3>
          <p>Place bids or trade offers on items you like.</p>
        </div>
        <div className="w-1/4 p-4 text-center">
          <h3 className="text-xl font-bold mb-2">Messaging</h3>
          <p>Communicate directly with sellers.</p>
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-ccWhite p-4 text-center" style={{ fontFamily: "Ubuntu" }}>
      <p>&copy; 2024 CloseConnect. All rights reserved.</p>
    </footer>
  );
};


const Home = ({listing,reviews,user}) => {

  return (
    <Layout user={user}>
        <div className="flex flex-col items-center justify-center ">
        <div className="p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold mb-2">Welcome, {user ? user.name : 'Guest'}</h1>
        </div>
      </div>
      <HeroSection />
      <Features />
      <Categories />
      <FeaturedProducts products={listing} title={'Featured Listing'} type={'listing'}/>
      <FeaturedProducts products={reviews} title={'Reviews'} type={'review'} />
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const cookies = parseCookies({req,res});
  const { token, userId } = cookies;
  const { user } = await checkAuth(token,userId);

  
  return {
    props: {
      user:user,
      listing:[],
      reviews:[  {
        name: 'John D.',
        rating: 5,
        title: 'Outstanding Service!',
        content:
          "I've been using their services for over a year now, and I couldn't be happier. The transition to their cloud-based platform was seamless, and their support team is always available to help. Highly recommend!",
      }]
    },
  }
})
export default Home;

