import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../Navbar';
import Room from '../Room/Room';
import Search from '../Search';

const Sidebar = ({ users, setUserName, handleKey }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Search setUserName={setUserName} handleKey={handleKey} />
      <div id={users.length > 0 ? 'listRoom' : ''} className='h-[630px]'>
        {users.map((user, _index) => (
          <Room
            key={user.id}
            avatar={user.photoURL}
            name={user.userName}
            endMessage='What are you doing?'
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
