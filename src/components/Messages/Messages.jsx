import React, { useContext, useState } from 'react';
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { AiOutlineArrowRight } from 'react-icons/ai';

import Message from '../Message';
import { db } from '../../firebase';
import Input from '../Input';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Messages = ({ messages, userInfoAtRoomActive }) => {
  const [text, setText] = useState('');
  const [urls, setUrls] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMessage = async () => {
    if (urls.length > 0) {
      await updateDoc(doc(db, 'rooms', data.roomId), {
        messages: arrayUnion({
          id: uuid(),
          image: urls,
          text: text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    } else {
      if (text !== '') {
        await updateDoc(doc(db, 'rooms', data.roomId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      } else {
        return;
      }
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.roomId + '.lastMessage']: {
        text,
      },
      [data.roomId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.id), {
      [data.roomId + '.lastMessage']: {
        text,
      },
      [data.roomId + '.date']: serverTimestamp(),
    });
    setText('');
  };

  return (
    <div className='messages relative'>
      <div className='bg-gray-200 show-messages scroll-view'>
        {messages.length === 0 ? (
          <InfoUserEmptyMessages userInfoAtRoomActive={userInfoAtRoomActive} />
        ) : (
          messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              images={message?.image}
              currentUser={currentUser}
              data={data}
            />
          ))
        )}
      </div>
      <div className='fixed bottom-0 w-[67%]'>
        <Input
          click={handleSendMessage}
          setText={setText}
          text={text}
          setUrls={setUrls}
          urls={urls}
        />
      </div>
    </div>
  );
};

const InfoUserEmptyMessages = ({ userInfoAtRoomActive }) => {
  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <img
        src={userInfoAtRoomActive?.photoURL}
        className='w-[50px] h-[50px] rounded-full object-cover'
        alt='avatar'
      />
      <p className='text-gray-500 text-lg font-medium'>
        {userInfoAtRoomActive?.userName}
      </p>
      <div className='group flex items-center text-sm text-gray-400 bg-slate-600 px-5 py-1 rounded-md hover:scale-105 transition-all duration-150 cursor-pointer'>
        View profile{' '}
        <AiOutlineArrowRight className='ml-3 group-hover:translate-x-2 transition-all duration-150' />
      </div>
    </div>
  );
};

export default Messages;
