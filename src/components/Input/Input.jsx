import React from 'react';
import { AddImage, Attach } from '../../assets/images/index';
const Input = () => {
  return (
    <div className='h-[70px] flex justify-between items-center bg-white'>
      <input
        className='h-full focus:outline-none px-3 w-[80%]'
        placeholder='Type something...'
      />
      <div className='flex justify-end items-center gap-3 pr-2'>
        <img className='cursor-pointer' src={Attach} alt='add img' />
        <img className='cursor-pointer' src={AddImage} alt='add img' />
        <button className='px-3 py-1 border rounded-md text-sm bg-green-500 text-white'>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
