import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDrriwhbHweBIaaPhqVBfCCDxpjzACMOLU",
  authDomain: "cmnd-z.firebaseapp.com",
  databaseURL: "https://cmnd-z.firebaseio.com",
  projectId: "cmnd-z",
  storageBucket: "cmnd-z.appspot.com",
  messagingSenderId: "581089626425",
  appId: "1:581089626425:web:9e2fe292aca5ae65f080e8",
  measurementId: "G-17VQQYS9T3"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;