import React, { useState } from 'react';
import Navbar from '../Navbar';
import Room from '../Room/Room';
import Search from '../Search';

const Sidebar = () => {
  const [moreRoom] = useState(true);
  return (
    <React.Fragment>
      <Navbar />
      <Search />
      <div id={moreRoom ? 'listRoom' : ''} className='h-[630px]'>
        {[1, 2, 3, 4343, 243, 43, 24, 32, 432].map((_item, index) => (
          <Room
            key={index}
            avatar={
              'https://images.pexels.com/photos/14211152/pexels-photo-14211152.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
            }
            name='Trong Son'
            endMessage='What are you doing?'
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
