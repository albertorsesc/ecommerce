import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (auth) => {
  const userDocRef = doc(db, 'users', auth.uid)
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = auth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user object: ' + error);
    }
  }

  return userDocRef;
};