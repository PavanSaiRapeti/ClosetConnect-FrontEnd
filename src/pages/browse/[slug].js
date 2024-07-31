import React, { useState } from 'react';
import Layout from 'pages/Layout';
import { wrapper } from 'store';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { checkAuth } from 'utils/authHelpers';
import { VALIDATE_TOKEN_SUCCESS } from 'store/types/apiActionTypes';
import ListingGrid from '@/components/Home/LisitingGrid';

const CategoryPage = ({title, user}) => {
  const category = false;
  const [page, setPage] = useState(0);

  return (
  <Layout user={user}>
    <nav className="text-sm font-medium text-gray-700">
      <ol className="list-reset p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/home" passHref>
            <a>Home</a>
          </Link>
          <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </li>
        <li className="flex items-center">
          <span>{title}</span>
        </li>
      </ol>
    </nav>
    <section className="p-10" style={{ fontFamily: 'Ubuntu' }}>
      <div className="w-full bg-ccWhite p-6 rounded-lg shadow-lg flex">
        <aside className="w-1/4 pr-6">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          {/* Add your filter components here */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option>All Categories</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price Range</label>
            <input type="range" className="w-full mt-1" />
          </div>
          {/* Add more filters as needed */}
        </aside>
        <div className="w-3/4">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <ListingGrid page={page} setPage={setPage} />
        </div>
      </div>
    </section>
  </Layout>
    
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
    const { slug } = context.params;
    const cookies = parseCookies(context);
    const { token, userId } = cookies;
    console.log('dog==>', token, userId, store);
    let userData = null;
    if (token) {
      const { user } = await checkAuth(token, userId);
      userData = user || null;
      if (user) {
        store.dispatch({
          type: VALIDATE_TOKEN_SUCCESS,
          payload: { user: userData, isLoggedIn: true }
        });
      }
    }
      return {
        props: {
            title:slug,
            user: userData,
        },
      };
    }
  );

export default CategoryPage;