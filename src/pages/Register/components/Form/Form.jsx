import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import addAvatar from '../../../../assets/images/addAvatar.png';
import Button from '../../../../components/Button/Button';

const Form = () => {
  const [previewImage, setPreviewImage] = useState('');

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='p-10 bg-white rounded-xl'>
        <div className='text-center mb-5'>
          <span className='text-gradient font-medium text-4xl'>Sign up</span>
        </div>
        <div className='form w-[400px]'>
          <div className='form-group'>
            <label>Name:</label>
            <input
              className='input-field'
              type={'text'}
              placeholder='Enter user name...'
            />
          </div>
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
            <input
              type={'file'}
              id='file'
              style={{ display: 'none' }}
              onChange={(e) =>
                setPreviewImage(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        </div>
        <Button title={'Sign up'} />
        <p className='mt-2 text-center text-gray-400'>
          You have an account?{' '}
          <Link to={'/login'}>
            <span className='text-gradient'>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
