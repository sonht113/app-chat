import React from 'react';

const ButtonLogout = ({ handleLogout }) => {
  return (
    <button
      className='py-1 px-3 border rounded-md text-gray-300 text-xs'
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  );
};

export default ButtonLogout;
