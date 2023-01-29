import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

import Button from '../../components/Button/Button';
import { auth } from '../../firebase';
import { toastifySuccess } from '../../utils/toast';
import Toastify from '../../components/Toastify';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const durationToastify = 1500;
  const themeToastify = 'dark';

  const handleSendReqResetPassword = (data) => {
    if (!data) return;
    const email = data.email;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastifySuccess(
          'Send successfully! Please check your email !',
          durationToastify,
          themeToastify
        );
        setTimeout(() => {
          navigate('/');
        }, 1600);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Toastify theme={themeToastify} duration={durationToastify} />
      <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex flex-col justify-center items-center'>
        <div className='bg-white px-5 py-5 rounded-lg'>
          <div className='text-center mb-5'>
            <p className='text-gradient font-medium text-4xl'>Reset password</p>
          </div>
          <form
            className='form md:w-[400px]'
            onSubmit={handleSubmit(handleSendReqResetPassword)}
          >
            <div className='form-group h-[80px]'>
              <label>Email:</label>
              <input
                className='input-field'
                name='email'
                type={'text'}
                placeholder='Enter email registered your account...'
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className='text-xs text-red-600'>Email is required</span>
              )}
            </div>
            <Button title={'Send'} />
          </form>
          <p className='text-right text-sm hover:underline cursor-pointer text-gray-400'>
            <Link to={'/'}>Back to login...</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
