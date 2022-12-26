import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <div className='flex justify-between items-center px-3 py-5 bg-[#2e2d4b]'>
      <div className='font-bold text-lg text-gradient'>Moutain Chat</div>
      <div className='flex items-center'>
        <div className='flex items-center mr-3'>
          <img
            className='w-[30px] h-[30px] object-cover rounded-full mr-2'
            src='https://images.pexels.com/photos/14446254/pexels-photo-14446254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
            alt='avatar'
          />
          <span className='text-white text-sm'>Trong Son</span>
        </div>
        <button
          className='py-1 px-3 border rounded-md text-gray-300 text-xs'
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
