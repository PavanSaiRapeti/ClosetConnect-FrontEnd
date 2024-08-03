import React from 'react';

const Button = ({ text, onClick }) => {
    return (
      <button 
        onClick={onClick} 
        className="block w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300"
      >
        {text}
      </button>
    );
  };
  
  export default Button;