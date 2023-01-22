import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import Compressor from 'compressorjs';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Skeleton } from '@mui/material';

import { AddImage, Attach } from '../../assets/images/index';
import { storage } from '../../firebase';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';

const Input = ({ click, setText, text, setUrls }) => {
  const [imagePreview, setImagePreview] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const handleChangeImage = (e) => {
    for (let file of e.target.files) {
      const newImage = file;
      newImage['id'] = uuid();
      setImages((prevState) => [...prevState, newImage]);
      setImagePreview((prevStated) => [
        ...prevStated,
        URL.createObjectURL(file),
      ]);
    }
  };

  const handleRemoveImage = (index) => {
    const imagesFake = images;
    const imagePreviewFake = imagePreview;
    imagesFake.splice(index, 1);
    imagePreviewFake.splice(index, 1);
    setImagePreview([...imagePreviewFake]);
    setImages([...imagesFake]);
  };

  useEffect(() => {
    if (images.length > 0) {
      images.map((image) => {
        const storageRef = ref(storage, uuid());
        new Compressor(image, {
          quality: 0.6,
          success(result) {
            const upload = uploadBytesResumable(storageRef, result);
            upload.on(
              'state_changed',
              (snapshot) => {
                const progress =
                  Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
                  100;
                setProgress(progress);
              },
              (_err) => {
                console.log(_err);
              },
              () => {
                getDownloadURL(upload.snapshot.ref).then(
                  async (downloadUrl) => {
                    setUrls((prevState) => [...prevState, downloadUrl]);
                  }
                );
              }
            );
          },
          error(err) {
            console.log(err);
          },
        });
      });
    }
  }, [images]);

  return (
    <div className='flex flex-col'>
      {imagePreview.length > 0 && (
        <div className='h-[150px] bg-white'>
          <div className='w-full flex items-center gap-5 absolute top-0 left-0 bg-white py-3 px-3'>
            {imagePreview.length > 0 &&
              imagePreview.map((image, index) => (
                <div key={image.name} className='relative inline-block'>
                  {progress < 100 ? (
                    <div>
                      <Skeleton
                        variant='rectangular'
                        width={100}
                        height={120}
                      />
                      <LinearProgressWithLabel value={progress} />
                    </div>
                  ) : (
                    <img
                      className='w-[100px] h-[120px] object-cover'
                      src={image}
                      alt='previewImage'
                    />
                  )}

                  <AiFillCloseCircle
                    onClick={() => handleRemoveImage(index)}
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
              setImages([]);
              setImagePreview([]);
              setUrls([]);
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
