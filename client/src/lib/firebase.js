// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr2GcFsS2S8W3N6C4VS42AQn8PVo3uD2U",
  authDomain: "imaginate0.firebaseapp.com",
  projectId: "imaginate0",
  storageBucket: "imaginate0.appspot.com",
  messagingSenderId: "753689922635",
  appId: "1:753689922635:web:116aec50ab5f26057411ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);