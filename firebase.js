// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZD516gKIPWk1DTp-1UyRKLjRq7dV8O9s",
  authDomain: "alpine-6bf17.firebaseapp.com",
  projectId: "alpine-6bf17",
  storageBucket: "alpine-6bf17.appspot.com",
  messagingSenderId: "1036159236743",
  appId: "1:1036159236743:web:f0baeae64ba716f2389622",
  measurementId: "G-YDDEXHHZRN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
