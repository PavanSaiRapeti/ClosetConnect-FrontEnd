import React from 'react';

const Button = ({ text, onClick }) => {
    return (
      <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-ccWhite font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {text}
      </button>
    );
  };
  
  export default Button;