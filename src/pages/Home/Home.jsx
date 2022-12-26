import React from 'react';
import Sidebar from '../../components/Sidebar';
import Chats from '../../components/Chats';

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='border-2 rounded-lg w-[70%] h-[80vh] overflow-hidden grid grid-cols-12'>
        <div className='col-span-4 bg-[#3e3c61]'>
          <Sidebar />
        </div>
        <div className='col-span-8 bg-[#7777a7]'>
          <Chats />
        </div>
      </div>
    </div>
  );
};

export default Home;
