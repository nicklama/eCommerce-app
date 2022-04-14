// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwroRliXvZdZDVaMejTduUMiDNxpqO_zI",
    authDomain: "ecommerce-app-4927f.firebaseapp.com",
    projectId: "ecommerce-app-4927f",
    storageBucket: "ecommerce-app-4927f.appspot.com",
    messagingSenderId: "422472708781",
    appId: "1:422472708781:web:005a202757c07ae72ecc24",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = firebase.firestore();
export default firestore; // exporting a firebase.firestore.Firestore object
