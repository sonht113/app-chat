import React from 'react';

const Message = ({ owner }) => {
  return (
    <div
      className={`flex ${
        owner ? 'flex-row-reverse' : ''
      } px-2 pt-3 justify-start items-start gap-5 mb-5`}
    >
      <div className='flex flex-col items-center'>
        <img
          className='w-[40px] h-[40px] rounded-full object-cover'
          src='https://images.pexels.com/photos/14446254/pexels-photo-14446254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          alt='avatar'
        />
        <span className='text-xs text-gray-500'>Just now</span>
      </div>
      <div className='flex flex-col justify-end items-end'>
        <div className='max-w-[150px]'>
          <p
            className={`${
              owner ? 'owner' : 'guest'
            } py-2 px-3 rounded-md text-sm mb-2 inline-block`}
          >
            Nostrud Lorem nisi officia sunt eu. Aliqua incididunt adipisicing
            elit proident labore in consectetur exercitation sunt non non enim
            sint. Dolor cupidatat occaecat in laboris commodo. Consequat nisi et
            ea tempor ullamco quis ullamco nisi velit.
          </p>
          <p
            className={`${
              owner ? 'float-right' : 'float-left'
            } text-xs text-gray-500`}
          >
            Đã xem...
          </p>
        </div>
        {/* <img
          className='w-[150px]'
          src='https://images.pexels.com/photos/14446254/pexels-photo-14446254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          alt='avatar'
        /> */}
      </div>
    </div>
  );
};

export default Message;
