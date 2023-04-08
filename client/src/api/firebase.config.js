// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAoo2M3lKXOb3a-cOzwnVSJ66usNC_R-s",
    authDomain: "decomm-cdcd5.firebaseapp.com",
    databaseURL:
        "https://decomm-cdcd5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "decomm-cdcd5",
    storageBucket: "decomm-cdcd5.appspot.com",
    messagingSenderId: "235486325068",
    appId: "1:235486325068:web:7981214e425ddfd90447e9",
    measurementId: "G-NLM3H6WXBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
