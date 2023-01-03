import React from 'react';
import { AddUser, More, Camera } from '../../assets/images/index';

const Chat = ({ roomActive }) => {
  return (
    <div className='flex justify-between items-center px-5 h-[70px] bg-[#3e3c61]'>
      <div>
        <p className='text-white font-medium text-lg'>
          {roomActive.user.userName}
        </p>
        <div className='flex items-center'>
          <div className='w-[10px] h-[10px] bg-green-500 rounded-full mr-2'></div>
          <span className='text-white text-xs'>Đang hoạt động</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <img
          className='cursor-pointer w-[35px]'
          src={Camera}
          alt='Call video'
        />
        <img
          className='cursor-pointer w-[35px]'
          src={AddUser}
          alt='Add new user'
        />
        <img className='cursor-pointer w-[35px]' src={More} alt='Call video' />
      </div>
    </div>
  );
};

export default Chat;
