import React from 'react';
import { AddImage, Attach } from '../../assets/images/index';
const Input = ({ click, setText, setFile, text }) => {
  return (
    <div className='h-[70px] flex justify-between items-center bg-white'>
      <input
        className='h-full focus:outline-none px-3 w-[80%]'
        placeholder='Type something...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='flex justify-end items-center gap-3 pr-2'>
        <img className='cursor-pointer' src={Attach} alt='add img' />
        <input
          type='file'
          className='hidden'
          id='addImage'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label className='cursor-pointer' htmlFor='addImage'>
          <img src={AddImage} alt='add img' />
        </label>
        <button
          onClick={click}
          className='px-3 py-1 border rounded-md text-sm bg-green-500 text-white'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
