import React, { useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import Form from './components/Form';
import { AuthContext } from '../../context/AuthContext';
import { toastifyError, toastifySuccess } from '../../utils/toast';
import Toastify from '../../components/Toastify';

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const durationToastify = 1500;
  const themeToastify = 'dark';

  const handleSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) return;
      setCurrentUser(res.user);
      toastifySuccess('Login successfully...', durationToastify, themeToastify);
      navigate('/chat');
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        return toastifyError(
          'Email invalid...',
          durationToastify,
          themeToastify
        );
      }
      if (err.code === 'auth/user-not-found') {
        return toastifyError(
          'This email is not registered ...',
          durationToastify,
          themeToastify
        );
      }
      if (err.code === 'auth/wrong-password') {
        return toastifyError(
          'Password invalid...',
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

export default Login;
