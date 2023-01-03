import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import Navbar from '../Navbar';
import Room from '../Room/Room';
import Search from '../Search';

const Sidebar = ({
  setUserName,
  handleKey,
  handleSelectRoom,
  rooms,
  setActiveRoom,
  activeRoom,
}) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
    setActiveRoom(user.userName);
  };

  return (
    <React.Fragment>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Search
        setUserName={setUserName}
        handleKey={handleKey}
        user={user}
        handleSelectRoom={handleSelectRoom}
      />
      <div id={8 > 5 ? 'listRoom' : ''}>
        <div className='mb-3'>
          <span className='px-4 py-2 background-gradient text-white'>
            Box chat
          </span>
        </div>
        {rooms &&
          Object.entries(rooms)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((room, _index) => (
              <Room
                activeRoom={activeRoom === room[1].userInfo.userName}
                click={() => {
                  handleSelect(room[1].userInfo);
                }}
                key={room[0]}
                avatar={room[1].userInfo?.photoURL}
                name={room[1].userInfo?.userName}
                endMessage={room[1]?.lastMessage?.text}
              />
            ))}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
