// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCghntIu-z-ZkgNsXAkU_JeqMWS7fcVvYg',
  authDomain: 'netflix-clone-7bf2b.firebaseapp.com',
  projectId: 'netflix-clone-7bf2b',
  storageBucket: 'netflix-clone-7bf2b.appspot.com',
  messagingSenderId: '580042064199',
  appId: '1:580042064199:web:d23b6d100f511e72eb4c62',
};

// Initialize Firebase
// check if app is initialized and initialize if it is not - nextjs server side rendering protection
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
