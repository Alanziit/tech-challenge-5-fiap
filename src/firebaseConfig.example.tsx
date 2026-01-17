import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

import { Auth, getAuth } from 'firebase/auth';

import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase configuration template
// Copy this file to firebaseConfig.tsx and fill with your real Firebase credentials
// IMPORTANT: firebaseConfig.tsx is in .gitignore to prevent exposing sensitive data

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let app: FirebaseApp;
let auth: Auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, storage, database };
