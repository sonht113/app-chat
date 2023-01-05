import React, { useEffect, useRef } from 'react';

const Message = ({ message, currentUser, data }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex ${
        message.senderId === currentUser.uid ? 'flex-row-reverse' : ''
      } px-2 pt-3 justify-start items-start gap-5 mb-5 pb-[70px]`}
    >
      <div className='flex flex-col items-center'>
        <img
          className='w-[40px] h-[40px] rounded-full object-cover'
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data?.user?.photoURL
          }
          alt='avatar'
        />
        <span className='text-xs text-gray-500'>Just now</span>
      </div>
      <div
        className={`flex flex-col justify-end ${
          message.senderId === currentUser.uid ? 'items-end' : 'items-start'
        } `}
      >
        <div className='max-w-[150px] flex flex-col'>
          {message.text && (
            <p
              className={`${
                message.senderId === currentUser.uid ? 'owner' : 'guest'
              } py-2 px-3 rounded-md text-sm`}
            >
              {message.text}
            </p>
          )}
          <p
            className={`${
              message.senderId === currentUser.uid
                ? 'float-right'
                : 'float-left'
            } text-xs text-gray-500`}
          >
            Đã xem...
          </p>
        </div>
        {message.image && (
          <img className='w-[150px]' src={message.image} alt='avatar' />
        )}
      </div>
    </div>
  );
};

export default Message;
