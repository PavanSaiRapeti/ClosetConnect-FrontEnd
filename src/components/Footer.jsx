import React from 'react';
import Link from 'next/link';

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
            <Link href="/about">
              <a className="text-sm hover:underline">About Us</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm hover:underline">Contact</a>
            </Link>
            <Link href="/privacy">
              <a className="text-sm hover:underline">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm hover:underline">Terms of Service</a>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="https://facebook.com">
              <a target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Facebook</a>
            </Link>
            <Link href="https://twitter.com">
              <a target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Twitter</a>
            </Link>
            <Link href="https://instagram.com">
              <a target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Instagram</a>
            </Link>
          </div>
        </div>
      </div>
      </footer>
    );
  };
  
  export default Footer;