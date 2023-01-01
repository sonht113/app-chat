import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import Form from './components/Form';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [err, setErr] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) return;
      setCurrentUser(res.user);
      navigate('/home');
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
