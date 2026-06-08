import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace these with your actual Firebase configuration keys
// You can get this by going to console.firebase.google.com -> Create Project -> Web App
const firebaseConfig = {
  apiKey: "AIzaSyCQmX0uMo2MA1gnnBqWlcYNbA7etVDIz50",
  authDomain: "portfolio-6be4a.firebaseapp.com",
  projectId: "portfolio-6be4a",
  storageBucket: "portfolio-6be4a.firebasestorage.app",
  messagingSenderId: "740813207245",
  appId: "1:740813207245:web:7c93bf1e885ac1bbd39b84",
  measurementId: "G-TY77WGDVPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
