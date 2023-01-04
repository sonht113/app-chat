import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button/Button';

const Form = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    onSubmit(data);
  };

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='p-10 bg-white rounded-xl'>
        <div className='text-center mb-5'>
          <span className='text-gradient font-medium text-4xl'>Login</span>
        </div>
        <form className='form w-[400px]' onSubmit={handleSubmit(handleLogin)}>
          <div className='form-group h-[80px]'>
            <label>Email:</label>
            <input
              className='input-field'
              name='email'
              type={'text'}
              placeholder='Enter your email...'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='text-xs text-red-600'>Email is required</span>
            )}
          </div>
          <div className='form-group h-[80px]'>
            <label>Password:</label>
            <input
              className='input-field'
              name='password'
              type={'password'}
              placeholder='Enter your password...'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='text-xs text-red-600'>Password is required</span>
            )}
          </div>
          <Button title={'Login'} />
        </form>
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
