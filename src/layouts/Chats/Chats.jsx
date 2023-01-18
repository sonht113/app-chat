import { onSnapshot, doc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';

import { ChatContext } from '../../context/ChatContext';
import Chat from '../../components/Chat';
import Messages from '../../components/Messages';
import { db } from '../../firebase';

const Chats = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMesssages] = useState([]);

  console.log(messages);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'rooms', data.roomId), (doc) => {
      doc.exists() && setMesssages(doc.data().messages);
    });
    return () => unSub();
  }, [data.roomId]);
  return (
    <React.Fragment>
      <Chat roomActive={data} />
      <Messages messages={messages} />
    </React.Fragment>
  );
};

export default Chats;
