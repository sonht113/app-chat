import React from 'react';
import Room from '../Room/Room';

const Search = ({ setUserName, handleKey, user, onSelectRoomSearch }) => {
  return (
    <div className='mb-5 border-b-2'>
      <input
        onKeyDown={handleKey}
        onChange={(e) => setUserName(e.target.value)}
        type={'text'}
        placeholder='Find a user... '
        className='w-full p-2 text-sm focus:outline-none bg-[#3e3c61] text-white border-b'
      />
      {user && (
        <Room
          click={() =>
            onSelectRoomSearch(user?.id, user?.userName, user?.photoURL)
          }
          avatar={user?.photoURL}
          name={user?.userName}
          endMessage='What are you doing?'
        />
      )}
    </div>
  );
};

export default Search;
