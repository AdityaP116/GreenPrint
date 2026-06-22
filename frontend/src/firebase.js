import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Replace these with actual values for a real deployment.
// Using dummy values for now to allow the app to compile.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAwFWPPdDb9oddThYp3jzpmsisCVEcZFC4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "greenprint-b6498.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "greenprint-b6498",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "greenprint-b6498.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "84056980772",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:84056980772:web:1003c9da1673fa72fec7b1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LT22Y46CE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const db = getFirestore(app);
