import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import Navbar from '../Navbar';
import Room from '../Room/Room';
import Search from '../Search';

const Sidebar = ({ setUserName, handleKey, handleSelectRoom, userName }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <React.Fragment>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Search
        setUserName={setUserName}
        handleKey={handleKey}
        user={user}
        userName={userName}
      />
      <div id={8 > 5 ? 'listRoom' : ''} className='h-[630px]'>
        <div className='mb-3'>
          <span className='px-4 py-2 background-gradient text-white'>
            Box chat
          </span>
        </div>
        {/* <Room
          click={() => handleSelectRoom(user.id, user.userName, user.photoURL)}
          key={user.id}
          avatar={user.photoURL}
          name={user.userName}
          endMessage='What are you doing?'
        /> */}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
