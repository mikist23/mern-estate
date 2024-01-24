// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4d172.firebaseapp.com",
  projectId: "mern-estate-4d172",
  storageBucket: "mern-estate-4d172.appspot.com",
  messagingSenderId: "767568475086",
  appId: "1:767568475086:web:f02e8977a1cb2e5a29f19f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);