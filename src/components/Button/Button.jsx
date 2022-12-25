import React from 'react';

const Button = ({ title }) => {
  return (
    <>
      <button className='w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white rounded-lg'>
        {title}
      </button>
    </>
  );
};

export default Button;
