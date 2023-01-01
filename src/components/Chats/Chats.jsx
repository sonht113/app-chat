import React from 'react';
import Chat from '../Chat';
import Messages from '../Messages';

const Chats = ({ currentUser }) => {
  return (
    <React.Fragment>
      <Chat currentUser={currentUser} />
      <Messages />
    </React.Fragment>
  );
};

export default Chats;
