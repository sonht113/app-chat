import React, { useContext, useState, useEffect } from 'react';
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

import Sidebar from '../../layouts/Sidebar';
import Chats from '../../layouts/Chats';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleGetUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);

  const [userName, setUserName] = useState('');
  const [err, setErr] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState('');

  const handleKey = (e) => {
    e.code === 'Enter' && handleGetUser(userName, setErr, currentUser);
  };

  const handleSelectRoomSearch = async (
    idUserSelect,
    userNameSelect,
    photoURL
  ) => {
    const roomId =
      currentUser.uid > idUserSelect
        ? currentUser.uid + idUserSelect
        : idUserSelect + currentUser.uid;
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

  useEffect(() => {
    const getRooms = () => {
      if (currentUser.uid) {
        const unsub = onSnapshot(
          doc(db, 'userChats', currentUser.uid),
          (doc) => {
            const res = Object.entries(doc.data())[0];
            if (res) {
              data
                ? setActiveRoom(data.user.userName)
                : setActiveRoom(res[1]?.userInfo?.userName);
            }
            setRooms(doc.data());
          }
        );
        return () => unsub();
      }
    };
    currentUser.uid && getRooms();
  }, [currentUser.uid, data]);

  return (
    <div className='h-[100vh]'>
      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-4 bg-[#3e3c61]'>
          <Sidebar
            handleKey={handleKey}
            setUserName={setUserName}
            handleSelectRoomSearch={handleSelectRoomSearch}
            rooms={rooms}
            setActiveRoom={setActiveRoom}
            activeRoom={activeRoom}
          />
        </div>
        <div className='col-span-8 bg-[#7777a7]'>
          {data.roomId !== 'null' ? (
            <Chats />
          ) : (
            <div className='w-full h-[100vh] flex justify-center items-center'>
              <span className='text-white'>Please choose room chat...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
