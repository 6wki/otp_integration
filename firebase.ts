// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzkyUr425OTklszM0gFSOmjHL8yFC4IPw",
  authDomain: "otp-supa.firebaseapp.com",
  projectId: "otp-supa",
  storageBucket: "otp-supa.appspot.com",
  messagingSenderId: "460861489624",
  appId: "1:460861489624:web:2c06d2073e3b2a5b5232ad",
  measurementId: "G-QVECEB3V0R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
