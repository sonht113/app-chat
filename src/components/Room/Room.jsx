import React from 'react';

const Room = ({ avatar, name, endMessage, click, activeRoom }) => {
  return (
    <div
      onClick={click}
      className={`px-10 cursor-pointer ${
        activeRoom ? 'bg-[#2e2d4b]' : 'hover:bg-[#2e2d4b]'
      } py-5 duration-150 border-t border-b border-gray-500`}
    >
      <div className='flex items-center'>
        <div className='relative'>
          <img
            src={avatar}
            alt='avatar'
            className='w-[60px] h-[60px] object-cover rounded-full'
          />
          <div className='absolute bottom-0 right-[2px] z-20 w-[14px] h-[14px] rounded-full bg-green-500 shadow-md'></div>
        </div>
        <div className='ml-5'>
          <p className='text-md text-gray-200 font-medium'>{name}</p>
          <p className='text-xs text-gray-200'>{endMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
