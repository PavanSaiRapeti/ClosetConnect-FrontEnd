import React from 'react';
import Link from 'next/link';
import Layout from 'pages/Layout';

const UserNotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-extrabold mb-4">User Not Found</h1>
        <p className="mb-4">The user you are looking for does not exist.</p>
        <Link href="/">
          <a className="text-blue-500">Go back to Home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default UserNotFound;