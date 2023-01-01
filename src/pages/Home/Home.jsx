import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Chats from '../../components/Chats';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { users } = useContext(UserContext);

  const [userName, setUserName] = useState('');
  const [err, setErr] = useState(false);

  const { handleGetUsers } = useContext(UserContext);

  const handleKey = (e) => {
    e.code === 'Enter' && handleGetUsers(userName, setErr, currentUser);
  };

  useEffect(() => {
    handleGetUsers(userName, setErr, currentUser);
  }, []);

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex justify-center items-center'>
      <div className='border-2 rounded-lg w-[70%] h-[80vh] overflow-hidden grid grid-cols-12'>
        <div className='col-span-4 bg-[#3e3c61]'>
          <Sidebar
            users={users}
            handleKey={handleKey}
            setUserName={setUserName}
          />
        </div>
        <div className='col-span-8 bg-[#7777a7]'>
          <Chats currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Home;
