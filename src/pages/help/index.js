import Layout from 'pages/Layout';
import React from 'react';

const HowItWorks = () => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#7459FF" }}>How It Works</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-ccWhite p-4 rounded-full">1</div>
          <p>Sign up with your ONE CARD and create a profile.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-ccWhite p-4 rounded-full">2</div>
          <p>Upload your items with a description and price.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-ccWhite p-4 rounded-full">3</div>
          <p>Browse items from other students and place bids or trade offers.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-ccWhite p-4 rounded-full">4</div>
          <p>Communicate with sellers and complete transactions securely.</p>
        </div>
      </div>
    </section>
  );
};

const HelpPage = () => {
  return (
    <Layout>
      <HowItWorks />
    </Layout>
  );
};

export default HelpPage;
