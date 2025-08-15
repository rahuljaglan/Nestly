// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCeBuNN5PPS_ou5ps9tBEtp_hwu9HS2BrQ',
  authDomain: 'nestly-98d2a.firebaseapp.com',
  projectId: 'nestly-98d2a',
  storageBucket: 'nestly-98d2a.firebasestorage.app',
  messagingSenderId: '435047322840',
  appId: '1:435047322840:web:7a74aec6a56c0e9bd233ad',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Auth with AsyncStorage for React Native
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };
