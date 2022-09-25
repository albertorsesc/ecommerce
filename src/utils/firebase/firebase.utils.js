import { initializeApp } from 'firebase/app'; 
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithRedirect, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCJ4wvwzyHfD3jbcscWNkm3KFHdyO-Uyn8",
  authDomain: "ecommerce-db-1d135.firebaseapp.com",
  projectId: "ecommerce-db-1d135",
  storageBucket: "ecommerce-db-1d135.appspot.com",
  messagingSenderId: "200662941008",
  appId: "1:200662941008:web:cece879d6ff093bd1ac055"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (auth, additionalData = {}) => {
  if (!auth) return;

  const userDocRef = doc(db, 'users', auth.uid)
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = auth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating the user object: ' + error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};