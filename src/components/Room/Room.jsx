import React from 'react';

const Room = ({ avatar, name, endMessage }) => {
  return (
    <div className='px-10 cursor-pointer hover:bg-[#2e2d4b] py-5 duration-150 border-b border-gray-500'>
      <div className='flex items-center'>
        <div className='relative'>
          <img
            src={avatar}
            alt='avatar'
            className='w-[60px] h-[60px] object-cover rounded-full'
          />
          <div className='absolute bottom-0 right-0 z-20 w-[14px] h-[14px] rounded-full bg-green-500 shadow-md'></div>
        </div>
        <div className='ml-5'>
          <p className='text-lg text-gray-200 font-medium'>{name}</p>
          <p className='text-xs text-gray-200'>{endMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
