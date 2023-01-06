import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import addAvatar from '../../../../assets/images/addAvatar.png';
import Button from '../../../../components/Button/Button';

const Form = ({ onSubmit }) => {
  const [previewImage, setPreviewImage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data, e) => {
    const f = e.target[3].files[0];
    onSubmit(data, f);
  };

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='p-10 bg-white rounded-xl'>
        <div className='text-center mb-5'>
          <span className='text-gradient font-medium text-4xl'>Sign up</span>
        </div>
        <form className='form w-[400px]' onSubmit={handleSubmit(handleSignUp)}>
          <div className='form-group h-[80px]'>
            <label>Name:</label>
            <input
              className='input-field'
              type={'text'}
              name={'userName'}
              placeholder='Enter user name...'
              {...register('userName', { required: true })}
            />
            {errors.userName && (
              <span className='text-xs text-red-600'>
                User name is required
              </span>
            )}
          </div>
          <div className='form-group h-[80px]'>
            <label>Email:</label>
            <input
              className='input-field'
              type={'text'}
              name={'email'}
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
              type={'password'}
              name={'password'}
              placeholder='Enter your password...'
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className='text-xs text-red-600'>
                Password is required & must be 6 or more characters{' '}
              </span>
            )}
          </div>
          <div className='h-[100px]'>
            <div className='flex justify-between items-center'>
              <label htmlFor='file'>
                <div className='cursor-pointer flex justify-start items-center'>
                  <img src={addAvatar} alt='add-avatar' />
                  <span className='text-gray-400'>Add an avatar</span>
                </div>
              </label>
              <div
                className={
                  previewImage
                    ? 'w-[60px]'
                    : 'preview-image w-[60px] h-[60px] border-2 rounded-md'
                }
              >
                {previewImage && (
                  <img
                    className='max-w-full object-cover overflow-hidden'
                    src={previewImage}
                    alt='preview'
                  />
                )}
              </div>
            </div>
            <input
              type={'file'}
              id='file'
              name='avatar'
              style={{ display: 'none' }}
              {...register('avatar', { required: true })}
              onChange={(e) =>
                setPreviewImage(URL.createObjectURL(e.target.files[0]))
              }
            />
            {errors.avatar && (
              <span className='text-xs text-red-600'>Avatar is required</span>
            )}
          </div>
          <Button title={'Sign up'} />
        </form>
        <p className='mt-2 text-center text-gray-400'>
          You have an account?{' '}
          <Link to={'/'}>
            <span className='text-gradient'>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
