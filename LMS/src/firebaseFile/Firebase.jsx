// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf2AcOdkkDzZYEBxPZVauUTKdbBkJwzJE",
    authDomain: "learningmanagement-b7d2e.firebaseapp.com",
    projectId: "learningmanagement-b7d2e",
    storageBucket: "learningmanagement-b7d2e.firebasestorage.app",
    messagingSenderId: "755570556342",
    appId: "1:755570556342:web:28a7e08a8164b7cf321517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const fireDB = getFirestore(app)
export default app;