import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';

import Form from './components/Form';
import { auth, storage, db } from '../../firebase';
import { toastifyError, toastifySuccess } from '../../utils/toast';
import Toastify from '../../components/Toastify';

const Register = () => {
  const durationToastify = 800;
  const themeToastify = 'dark';

  const navigate = useNavigate();

  const handleSubmit = async (data, f) => {
    const userName = data.userName;
    const email = data.email;
    const password = data.password;
    const file = f;

    try {
      if (file) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (!res) return;
        const storageRef = ref(storage, userName);
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            const upload = uploadBytesResumable(storageRef, result);
            upload.on(
              'state_changed',
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              (err) => {
                console.log(err);
              },
              () => {
                getDownloadURL(upload.snapshot.ref).then(
                  async (downloadUrl) => {
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
                    toastifySuccess(
                      'Sign up successfully!',
                      durationToastify,
                      themeToastify
                    );
                    setTimeout(() => {
                      navigate('/chat');
                    }, 900);
                  }
                );
              }
            );
          },
          error(err) {
            console.log(err);
          },
        });
      } else {
        return toastifyError(
          'Sign up error! Please choose avatar...',
          durationToastify,
          themeToastify
        );
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        return toastifyError(
          'Sign up error! Email already in use...',
          durationToastify,
          themeToastify
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Toastify theme={themeToastify} duration={durationToastify} />
      <Form onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default Register;
