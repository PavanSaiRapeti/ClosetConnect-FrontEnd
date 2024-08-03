import React from 'react';

const Footer = ({ loading }) => {
    return (
      <footer className="bg-gray-800 text-ccWhite p-4 text-center" style={{ fontFamily: "Ubuntu" }}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">CloseConnect</h2>
            <p className="text-sm">© 2023 CloseConnect. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="/about" className="text-sm hover:underline">About Us</a>
            <a href="/contact" className="text-sm hover:underline">Contact</a>
            <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:underline">Terms of Service</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Instagram</a>
          </div>
        </div>
      </div>
      </footer>
    );
  };
  
  export default Footer;