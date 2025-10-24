// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import the services we need: Auth and Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// (This is the one you provided)
const firebaseConfig = {
  apiKey: "AIzaSyD3q9Rz33Mg3y3qbmtmuGBUxbPzdElgmzo",
  authDomain: "urbanfungi-a900a.firebaseapp.com",
  projectId: "urbanfungi-a900a",
  storageBucket: "urbanfungi-a900a.firebasestorage.app",
  messagingSenderId: "9152195641",
  appId: "1:9152195641:web:a2cb87a7df85e44514f1e8",
  measurementId: "G-BJDVXL0VFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
// and export them so other files can use them.
export const auth = getAuth(app);
export const db = getFirestore(app);