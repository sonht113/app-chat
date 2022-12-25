import React from 'react';

const Search = () => {
  return (
    <input
      type={'text'}
      placeholder='Find a user... '
      className='w-full p-2 text-sm focus:outline-none bg-[#3e3c61] text-white border-b'
    />
  );
};

export default Search;
