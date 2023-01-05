import React, { useContext, useState } from 'react';
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import Message from '../Message';
import { db, storage } from '../../firebase';
import Input from '../Input';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Messages = ({ messages }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMessage = async () => {
    if (file) {
      const storageRef = ref(storage, uuid());
      const upload = uploadBytesResumable(storageRef, file);
      upload.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (_err) => {
          // setErr(true);
          console.log(_err);
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then(async (downloadUrl) => {
            await updateDoc(doc(db, 'rooms', data.roomId), {
              messages: arrayUnion({
                id: uuid(),
                image: downloadUrl,
                text: text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          });
        }
      );
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
    setFile(null);
  };

  return (
    <div className='messages relative'>
      <div className='bg-gray-200 show-messages scroll-view'>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            currentUser={currentUser}
            data={data}
          />
        ))}
      </div>
      <div className='fixed bottom-0 w-[67%]'>
        <Input
          click={() => handleSendMessage()}
          setText={setText}
          text={text}
          setFile={setFile}
        />
      </div>
    </div>
  );
};

export default Messages;
