import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import Form from './components/Form';
import { auth, storage, db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) return;
      const storageRef = ref(storage, userName);
      const upload = uploadBytesResumable(storageRef, file);
      upload.on(
        (err) => {
          setErr(true);
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then(async (downloadUrl) => {
            await updateProfile(res.user, {
              displayName: userName,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              id: res.user.uid,
              userName,
              email,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/home');
          });
        }
      );
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <React.Fragment>
      <Form handleSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default Register;
