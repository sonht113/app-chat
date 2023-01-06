import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import ButtonLogout from '../ButtonLogout/ButtonLogout';

const Navbar = ({
  currentUser,
  setCurrentUser,
  setUser,
  dispatch,
  setActiveRoom,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser({});
    dispatch({ type: 'LOGOUT_USER' });
    setActiveRoom('');
    setUser(null);
    navigate('/');
  };
  return (
    <div className='flex justify-between items-center px-3 py-5 bg-[#2e2d4b]'>
      <div className='font-bold text-lg text-gradient'>Moutain Chat</div>
      <div className='flex items-center'>
        <div className='flex items-center mr-3'>
          <img
            className='w-[30px] h-[30px] object-cover rounded-full mr-2'
            src={currentUser.photoURL}
            alt='avatar'
          />
          <span className='text-white text-sm'>{currentUser.displayName}</span>
        </div>
        <ButtonLogout handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;
