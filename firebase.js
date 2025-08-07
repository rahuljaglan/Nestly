// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCeBuNN5PPS_ou5ps9tBEtp_hwu9HS2BrQ',
  authDomain: 'nestly-98d2a.firebaseapp.com',
  projectId: 'nestly-98d2a',
  storageBucket: 'nestly-98d2a.firebasestorage.app',
  messagingSenderId: '435047322840',
  appId: '1:435047322840:web:7a74aec6a56c0e9bd233ad',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
