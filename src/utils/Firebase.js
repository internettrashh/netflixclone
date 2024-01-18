// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfPRPKeGKau7lF20y8dJGJY64Q_r0e3g0",
  authDomain: "netflixclone-a18f6.firebaseapp.com",
  projectId: "netflixclone-a18f6",
  storageBucket: "netflixclone-a18f6.appspot.com",
  messagingSenderId: "378928190064",
  appId: "1:378928190064:web:068b5ad1636ddfdaee1ab5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);