import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASyh2MfTWOIp4hM84O2HFrD5hEDq4WFAA",
  authDomain: "upi2-0.firebaseapp.com",
  projectId: "upi2-0",
  storageBucket: "upi2-0.appspot.com",
  messagingSenderId: "486102968259",
  appId: "1:486102968259:web:4bdec6755fac4d77833f76",
  measurementId: "G-6V12CRWTES"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };