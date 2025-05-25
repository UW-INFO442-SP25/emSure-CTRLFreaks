// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9xIoa7pRX23-s3AdEDHgxk97S1kGtFyU",
  authDomain: "emsured.firebaseapp.com",
  projectId: "emsured",
  storageBucket: "emsured.firebasestorage.app",
  messagingSenderId: "293980636229",
  appId: "1:293980636229:web:3db295493de8e71fba4f2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default app;