import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import { AddImage, Attach } from '../../assets/images/index';

const Input = ({ click, setText, setFiles, text, files }) => {
  const [imagePreview, setImagePreview] = useState([]);

  const handleChangeImage = (e) => {
    for (let file of e.target.files) {
      const newImage = file;
      newImage['id'] = uuid();
      setFiles((prevState) => [...prevState, newImage]);
      setImagePreview((prevStated) => [
        ...prevStated,
        URL.createObjectURL(file),
      ]);
    }
  };

  console.log(imagePreview, files);

  return (
    <div className='flex flex-col'>
      {imagePreview.length > 0 && (
        <div className='h-[150px] bg-white'>
          <div className='w-full flex items-center gap-5 absolute top-0 left-0 bg-white py-3 px-3'>
            {imagePreview.length > 0 &&
              imagePreview.map((image, index) => (
                <div key={index} className='relative inline-block'>
                  <img
                    className='w-[100px] h-[120px] object-cover'
                    src={image}
                    alt='previewImage'
                  />
                  <AiFillCloseCircle
                    onClick={() => {
                      console.log(index);
                      const result = imagePreview.splice(index, 1);
                      setImagePreview([...result]);
                    }}
                    className='text-xl absolute top-[-8px] right-[-10px] cursor-pointer'
                  />
                </div>
              ))}
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
            multiple
            id='addImage'
            onChange={handleChangeImage}
          />
          <label className='cursor-pointer' htmlFor='addImage'>
            <img src={AddImage} alt='add img' />
          </label>
          <button
            onClick={() => {
              click();
              setFiles([]);
              setImagePreview([]);
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
