import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

import { Auth, getAuth } from 'firebase/auth';

import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


let app:FirebaseApp;
let auth: Auth;

if(!getApps().length){
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}else{
  app = getApp();
  auth = getAuth(app);
}

export { app, auth };
export const storage = getStorage(app);
export const database = getDatabase(app);
