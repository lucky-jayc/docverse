// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrUlqgVYYGboytk_-Aq6KcMhttMz0FBOE",
  authDomain: "docverse-51c4c.firebaseapp.com",
  projectId: "docverse-51c4c",
  storageBucket: "docverse-51c4c.firebasestorage.app",
  messagingSenderId: "811321721575",
  appId: "1:811321721575:web:3fc5e6fabe5f9baab55842",
  measurementId: "G-2DM9F39NND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
