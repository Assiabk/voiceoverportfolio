// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv0Hx-6rLnxR5rrF2ht2dKtWTVYS8XjMQ",
  authDomain: "voiceover-6e19d.firebaseapp.com",
  projectId: "voiceover-6e19d",
  storageBucket: "voiceover-6e19d.firebasestorage.app",
  messagingSenderId: "948971327925",
  appId: "1:948971327925:web:314d4a031062e3a4a809fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
export const db = getFirestore(app);
