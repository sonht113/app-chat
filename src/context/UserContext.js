import { createContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const handleGetUsers = async (keyWordSearch, setErr, currentUser) => {
    try {
      if (keyWordSearch !== '') {
        const q = query(
          collection(db, 'users'),
          where('userName', '==', keyWordSearch)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          doc.data() ? setUsers([doc.data()]) : setUsers([]);
        });
      } else {
        const results = [];
        const querySnapshot = await getDocs(collection(db, 'users'));
        for (const doc of querySnapshot.docs) {
          const user = doc.data();
          if (user.email !== currentUser.email) {
            results.push(doc.data());
          }
        }
        setUsers([...results]);
      }
    } catch (error) {
      setErr(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, handleGetUsers }}>
      {children}
    </UserContext.Provider>
  );
};
