import React from 'react';
import Navbar from '../Navbar';
import Room from '../Room/Room';
import Search from '../Search';

const Sidebar = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <div id='listRoom' className='overflow-y-scroll h-[630px]'>
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
        <Room
          avatar={
            'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          name='Trong Son'
          endMessage='What are you doing?'
        />
      </div>
    </div>
  );
};

export default Sidebar;
