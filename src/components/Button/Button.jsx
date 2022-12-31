import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ title }) => {
  const navigate = useNavigate();

  // const handleNavigate = () => {
  //   navigate('/home');
  // };
  return (
    <>
      <button
        type='submit'
        className='w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white rounded-lg'
      >
        {title}
      </button>
    </>
  );
};

export default Button;
