import React, { useContext, useState, useEffect } from 'react';
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import Sidebar from '../../components/Sidebar';
import Chats from '../../components/Chats';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleGetUser } = useContext(UserContext);

  const [userName, setUserName] = useState('');
  const [err, setErr] = useState(false);

  const handleKey = (e) => {
    e.code === 'Enter' && handleGetUser(userName, setErr, currentUser);
  };

  const handleSelectRoom = async (idUserSelect, userNameSelect, photoURL) => {
    const roomId =
      currentUser.uid > idUserSelect
        ? currentUser.uid + idUserSelect
        : idUserSelect + currentUser.uid;
    console.log(roomId);
    try {
      const res = await getDoc(doc(db, 'rooms', roomId));
      if (!res.exists()) {
        await setDoc(doc(db, 'rooms', roomId), { messages: [] });
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [roomId + '.userInfo']: {
            id: idUserSelect,
            userName: userNameSelect,
            photoURL: photoURL,
          },
          [roomId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', idUserSelect), {
          [roomId + '.userInfo']: {
            id: currentUser.uid,
            userName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [roomId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='border-2 rounded-lg w-[70%] h-[80vh] overflow-hidden grid grid-cols-12'>
        <div className='col-span-4 bg-[#3e3c61]'>
          <Sidebar
            userName={userName}
            handleKey={handleKey}
            setUserName={setUserName}
            handleSelectRoom={handleSelectRoom}
          />
        </div>
        <div className='col-span-8 bg-[#7777a7]'>
          <Chats currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Home;
