import React from 'react';
import Room from '../Room/Room';

const Search = ({
  setUserName,
  handleKey,
  user,
  onSelectRoomSearch,
  userName,
}) => {
  return (
    <div className='mb-5 border-b-2 relative'>
      <input
        onKeyDown={handleKey}
        onChange={(e) => setUserName(e.target.value)}
        type={'text'}
        value={userName}
        placeholder='Find a user... '
        className='w-full p-2 text-sm focus:outline-none bg-[#3e3c61] text-white border-b'
      />
      {user && (
        <div className='absolute top-[100%] left-0 z-[99999] bg-gray-400/70 w-full md:h-[82.6vh] lg:h-[86vh]'>
          <Room
            click={() => {
              setUserName('');
              onSelectRoomSearch(user?.id, user?.userName, user?.photoURL);
            }}
            activeRoom={true}
            avatar={user?.photoURL}
            name={user?.userName}
            endMessage={user.endMessage ? user.endMessage : ''}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
