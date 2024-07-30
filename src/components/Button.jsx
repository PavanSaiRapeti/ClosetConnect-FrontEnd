import React from 'react';

const Button = ({ text, onClick }) => {
    return (
      <button 
        onClick={onClick} 
        className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
      >
        {text}
      </button>
    );
  };
  
  export default Button;