import { createContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleGetUser = async (keyWordSearch, setErr, currentUser) => {
    try {
      if (keyWordSearch !== '') {
        const q = query(
          collection(db, 'users'),
          where('userName', '==', keyWordSearch)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setUser(null);
        } else {
          querySnapshot.forEach((doc) => {
            const res = doc.data();
            if (res && res.email !== currentUser.email) {
              setUser(res);
            } else {
              setUser(null);
            }
          });
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setErr(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, handleGetUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
