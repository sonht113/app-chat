import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AddImage, Attach } from '../../assets/images/index';

const Input = ({ click, setText, setFile, text }) => {
  const [imagePreview, setImagePreview] = useState('');

  return (
    <div className='flex flex-col'>
      {imagePreview && (
        <div className='h-[150px] bg-white'>
          <div className='w-full absolute top-0 left-0 bg-white py-3 px-3'>
            <div className='relative inline-block'>
              <img
                className='w-[100px] h-[120px] object-cover'
                src={imagePreview}
                alt='previewImage'
              />
              <AiFillCloseCircle
                onClick={() => {
                  setImagePreview('');
                  setFile(null);
                }}
                className='text-xl absolute top-[-8px] right-[-10px] cursor-pointer'
              />
            </div>
          </div>
        </div>
      )}
      <div className='h-[70px] flex justify-between items-center bg-white'>
        <input
          className='h-full focus:outline-none px-3 w-[80%]'
          placeholder='Type something...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className='flex justify-end items-center gap-3 pr-2'>
          <div>
            <img className='cursor-pointer' src={Attach} alt='add img' />
          </div>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            id='addImage'
            onChange={(e) => {
              setImagePreview(URL.createObjectURL(e.target.files[0]));
              setFile(e.target.files[0]);
            }}
          />
          <label className='cursor-pointer' htmlFor='addImage'>
            <img src={AddImage} alt='add img' />
          </label>
          <button
            onClick={() => {
              click();
              setFile(null);
              setImagePreview('');
            }}
            className='px-3 py-1 border rounded-md text-sm bg-green-500 text-white'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
