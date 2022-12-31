import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, storage, db } from '../../firebase';
import Form from './components/Form';

const Login = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
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

export default Login;
