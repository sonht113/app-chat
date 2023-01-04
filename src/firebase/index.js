// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'chat-app-react-a034c.firebaseapp.com',
  projectId: 'chat-app-react-a034c',
  storageBucket: 'chat-app-react-a034c.appspot.com',
  messagingSenderId: '1077394795460',
  appId: '1:1077394795460:web:1594ad57256a759b321291',
  measurementId: 'G-L8PJC9R6TB',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
