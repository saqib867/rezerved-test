import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "rezerved-c57af.firebaseapp.com",
  projectId: "rezerved-c57af",
  storageBucket: "rezerved-c57af.firebasestorage.app",
  messagingSenderId: "331643581574",
  appId: "1:331643581574:web:0cb4be6ce02abbdc400d07",
  measurementId: "G-FW7KBD1NRZ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { db, auth, storage };
