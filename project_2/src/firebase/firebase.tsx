// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9tZwQb0KCEOgSuf4Hi6rjF6FktxtcV2c",
  authDomain: "project2-e4b89.firebaseapp.com",
  projectId: "project2-e4b89",
  storageBucket: "project2-e4b89.appspot.com",
  messagingSenderId: "450046816462",
  appId: "1:450046816462:web:fb0b2bf9e2da0d5188a09f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);