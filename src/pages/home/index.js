import { validateTokenAndGetUser } from 'pages/api/auth/auth'
import Header from '../../components/Header'
import { useState } from 'react';


// Hero Section Component with Carousel
const HeroSection = () => {
  const slides = [
    {
      image: "https://via.placeholder.com/1200x400",
      title: "Welcome to CloseConnect",
      description: "The ultimate thrifting platform for college students."
    },
    {
      image: "https://via.placeholder.com/1200x400",
      title: "Sell Your Clothes",
      description: "Easily list your items and make extra cash."
    },
    {
      image: "https://via.placeholder.com/1200x400",
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
    <section className="relative text-center p-10">
      <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-96 object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
        <h2 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h2>
        <p className="text-lg mb-4">{slides[currentSlide].description}</p>
        <button onClick={() => window.location.href='/about'} className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold">Learn More</button>
        <div className="mt-4">
          <button onClick={prevSlide} className="mx-2 p-2 bg-white text-purple-600 rounded-full">&lt;</button>
          <button onClick={nextSlide} className="mx-2 p-2 bg-white text-purple-600 rounded-full">&gt;</button>
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-white p-4 rounded-full">1</div>
          <p>Sign up with your ONE CARD and create a profile.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-white p-4 rounded-full">2</div>
          <p>Upload your items with a description and price.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-white p-4 rounded-full">3</div>
          <p>Browse items from other students and place bids or trade offers.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-white p-4 rounded-full">4</div>
          <p>Communicate with sellers and complete transactions securely.</p>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  return (
    <section className="bg-gray-100 p-10">
      <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
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

// Testimonials Component
const Testimonials = () => {
  return (
    <section className="p-10 bg-purple-100">
      <h2 className="text-3xl font-bold text-center mb-6">What Students Are Saying</h2>
      <div className="flex flex-wrap justify-around">
        <div className="w-1/3 p-4">
          <p className="italic">"CloseConnect is amazing! I sold my old clothes in just a few days."</p>
          <p className="text-right mt-2">- Jane Doe</p>
        </div>
        <div className="w-1/3 p-4">
          <p className="italic">"I love being able to trade items with other students."</p>
          <p className="text-right mt-2">- John Smith</p>
        </div>
        <div className="w-1/3 p-4">
          <p className="italic">"The rating system helps me trust the sellers."</p>
          <p className="text-right mt-2">- Alice Johnson</p>
        </div>
      </div>
    </section>
  );
};

// Listing Component
const Listing = ({ listing }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img className="h-48 w-full object-cover rounded-t-lg" src={listing.image} alt={listing.title} />
      <div className="mt-2">
        <h3 className="text-lg font-bold">{listing.title}</h3>
        <p className="text-gray-600">${listing.price}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Bid ({listing.bids})</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Trade ({listing.trades})</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Message ({listing.messages})</button>
        </div>
      </div>
    </div>
  );
};

// Product Listing Component
const ProductListing = ({ listings }) => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold text-center mb-6">Product Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2024 CloseConnect. All rights reserved.</p>
      <div className="mt-2">
        <a href="/contact" className="mx-2">Contact</a>
        <a href="/privacy" className="mx-2">Privacy Policy</a>
        <a href="/terms" className="mx-2">Terms of Service</a>
      </div>
    </footer>
  );
};
const Home = ({ user }) => {
  console.log('user', user);
  const listings = [
    { id: 1, image: 'https://via.placeholder.com/200', title: 'Red Dress', price: 50, bids: 3, trades: 2, messages: 5 },
    { id: 2, image: 'https://via.placeholder.com/200', title: 'Blue Jeans', price: 40, bids: 1, trades: 0, messages: 2 },
    { id: 3, image: 'https://via.placeholder.com/200', title: 'Green Jacket', price: 60, bids: 5, trades: 3, messages: 4 }
  ];
  return (
    <div>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <ProductListing listings={listings} />
      <Testimonials />
      <Footer />
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const token = req?.cookies?.token || true

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  // const user = await validateTokenAndGetUser(token);

  // if (user) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      user: null,
    },
  }
}

export default Home;



