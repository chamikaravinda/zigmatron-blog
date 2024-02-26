// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zigma-blog.firebaseapp.com",
  projectId: "zigma-blog",
  storageBucket: "zigma-blog.appspot.com",
  messagingSenderId: "199180881114",
  appId: "1:199180881114:web:f021b4b2044ab0de37e9e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

