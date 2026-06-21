import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Replace these with actual values for a real deployment.
// Using dummy values for now to allow the app to compile.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy_api_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "greenprint.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "greenprint-hackathon",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "greenprint.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-dummy"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const db = getFirestore(app);
