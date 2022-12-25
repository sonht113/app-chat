import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Button/Button';

const Form = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='p-10 bg-white rounded-xl'>
        <div className='text-center mb-5'>
          <span className='text-gradient font-medium text-4xl'>Login</span>
        </div>
        <div className='form w-[400px]'>
          <div className='form-group'>
            <label>Email:</label>
            <input
              className='input-field'
              type={'text'}
              placeholder='Enter your email...'
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              className='input-field'
              type={'password'}
              placeholder='Enter your password...'
            />
          </div>
        </div>
        <Button title={'Login'} />
        <p className='mt-2 text-center text-gray-400'>
          You have an account?{' '}
          <Link to={'/'}>
            <span className='text-gradient'>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
