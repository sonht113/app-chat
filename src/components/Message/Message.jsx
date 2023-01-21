import { Box, ImageList, ImageListItem, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const Message = ({ message, currentUser, data, images }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const handleOpenModal = (image) => {
    setIsOpenModal(true);
    setImagePreview(image);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        className='flex justify-center items-center'
      >
        <Box className='w-[600px] max-h-[100vh]'>
          <img
            src={imagePreview}
            alt='preview-image'
            className='object-cover'
          />
        </Box>
      </Modal>
      <div
        ref={ref}
        className={`flex ${
          message.senderId === currentUser.uid ? 'flex-row-reverse' : ''
        } px-2 pt-3 justify-start items-start gap-5 mb-5 pb-[70px]`}
      >
        <div className='flex flex-col items-center'>
          <img
            className='w-[40px] h-[40px] rounded-full object-cover'
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data?.user?.photoURL
            }
            alt='avatar'
          />
          <span className='text-xs text-gray-500'>Just now</span>
        </div>
        <div
          className={`flex flex-col justify-end ${
            message.senderId === currentUser.uid ? 'items-end' : 'items-start'
          } `}
        >
          <div className='max-w-[150px] flex flex-col'>
            {message.text && (
              <p
                className={`${
                  message.senderId === currentUser.uid ? 'owner' : 'guest'
                } py-2 px-3 rounded-md text-sm`}
              >
                {message.text}
              </p>
            )}
            {/* <p
            className={`${
              message.senderId === currentUser.uid
                ? 'float-right'
                : 'float-left'
            } text-xs text-gray-500`}
          >
            Đã xem...
          </p> */}
          </div>
          {!images || (images && images.length === 0) ? (
            <div></div>
          ) : images && images.length <= 3 ? (
            <div className='flex items-center gap-1'>
              {images.map((i) => (
                <div className='group relative'>
                  <img
                    className='w-[130px] h-[150px] object-cover cursor-pointer group'
                    src={i}
                    key={i}
                    alt='image'
                  />
                  <div className='absolute w-[130px] h-[150px] top-0 left-0 invisible group-hover:visible duration-150 transition-all'>
                    <PopupDetailImage click={() => handleOpenModal(i)} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ImageList
              sx={{ width: 400, height: 350 }}
              cols={3}
              rowHeight={150}
            >
              {images &&
                images.map((i) => (
                  <ImageListItem key={i} className='group'>
                    <img
                      className='cursor-pointer'
                      src={`${i}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${i}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt='image'
                      loading='lazy'
                    />
                    <div className='absolute w-[131px] h-[150px] top-0 left-0 invisible group-hover:visible duration-150 transition-all'>
                      <PopupDetailImage click={() => handleOpenModal(i)} />
                    </div>
                  </ImageListItem>
                ))}
            </ImageList>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const PopupDetailImage = ({ click }) => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-gray-600/80'>
      <AiOutlineEye
        onClick={click}
        size={30}
        color='white'
        className='cursor-pointer'
      />
    </div>
  );
};

export default Message;
