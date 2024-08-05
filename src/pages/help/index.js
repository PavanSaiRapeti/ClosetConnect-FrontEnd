import { parseCookies } from 'nookies';
import Layout from 'pages/Layout';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from 'store';
import { setPageLoading } from 'store/actions/commonAction';
import { validateTokenAndFetchUser } from 'utils/authHelpers';

const HowItWorks = () => {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Brand</h2>
        <p className="mb-4">
          At Closet Connect, we believe you shouldn&apos;t have to compromise style for functionality. We offer trendy, affordable, and versatile clothing that can be worn multiple ways to suit the many events in your life. Our mission is to provide stylish and functional apparel that empowers you to express your unique style.
        </p>
        <p>
          Founded in 2024, Closet Connect has grown from a small startup to a beloved brand known for its innovative designs and commitment to quality. We believe in creating products that not only look good but also make your life easier.
        </p>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Meet Our Founders</h2>
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2">
            <p className="mb-4">
              Hi! We&apos;re Hemaya, Raphael, Luthfaan, and Yinglu, the founders and designers of Closet Connect. Growing up in a small town, we always dreamed of creating our own fashion line. After studying fashion design and working for top brands in New York City, we decided to start our own company.
            </p>
            <p className="mb-4">
              Then, something magical happened: Our sweet daughter, Emma, was born. She became our inspiration and the namesake of our brand. At Closet Connect, we create beautiful, functional, and affordable clothing that makes life easier for busy individuals like you.
            </p>
            <p className="mb-4">
              We&apos;re more than a clothing company. We love telling stories, so every collection is inspired by our own life experiences. We hope you find a piece that resonates with you and becomes a part of your story.
            </p>
            <p>
              We&apos;re so grateful for your support. Thank you for shopping with us, and welcome to the Closet Connect family!
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <img src="/assets/homepage1.png" alt="Founders" className="w-full h-auto object-cover rounded" />
          </div>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Sustainability</h2>
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-8">
            <img src="https://via.placeholder.com/300" alt="Sustainability" className="w-full h-auto object-cover rounded" />
          </div>
          <div className="md:w-1/2">
            <p className="mb-4">
              We believe in the importance of taking care of the Earth. That&apos;s why we&apos;re committed to sustainable practices in everything we do. From using eco-friendly materials to reducing waste in our production process, we&apos;re always looking for ways to minimize our environmental impact.
            </p>
            <p className="mb-4">
              Our eco-friendly clothing is made from high-quality, cruelty-free materials that look and feel just like the real thing. We&apos;re proud to offer products that are not only stylish and functional but also kind to the planet.
            </p>
            <p>
              Thank you for supporting our efforts to create a more sustainable future.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Giving Back</h2>
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2">
            <p className="mb-4">
              At Closet Connect, we believe in empowering, uplifting, and giving back to our community. That&apos;s why we partner with various charities and organizations to support causes that are close to our hearts.
            </p>
            <p className="mb-4">
              From donating a portion of our profits to providing clothing to those in need, we&apos;re committed to making a positive impact. We believe that together, we can make a difference.
            </p>
            <p>
              Thank you for being a part of our journey and for helping us give back to those in need.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <img src="https://via.placeholder.com/300" alt="Giving Back" className="w-full h-auto object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpPage = ({user}) => {
  return (
    <Layout user={user}>
      <HowItWorks />
    </Layout>
  );
};



export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const cookies = parseCookies({ req });
  const { token, userId } = cookies;
  store.dispatch(setPageLoading(true));
  const userData = await validateTokenAndFetchUser(store, token, userId, res);

  return {
    props: {
      user: userData || null
    },
  };
});

export default HelpPage;