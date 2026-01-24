import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

import { Auth, getAuth } from 'firebase/auth';

import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBYMuIK2et3LtPfTH_IcaWz0R5gcCR0DXE",
  authDomain: "tech-challange-5-fiap.firebaseapp.com",
  projectId: "tech-challange-5-fiap",
  storageBucket: "tech-challange-5-fiap.appspot.com",
  messagingSenderId: "10103477670",
  appId: "1:10103477670:web:cb033dd23cb1e697732b67"
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
