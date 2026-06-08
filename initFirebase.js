import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace these with the actual keys when you have them
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadInitialData() {
  try {
    const dataPath = path.join(__dirname, 'src', 'data', 'content.json');
    const dataRaw = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(dataRaw);

    console.log("Uploading data to Firestore...");
    await setDoc(doc(db, "portfolio", "content"), data);
    console.log("Successfully uploaded to Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("Error uploading data: ", error);
    process.exit(1);
  }
}

// uploadInitialData();
console.log("To upload data, add your Firebase Config to initFirebase.js and uncomment uploadInitialData() on line 35.");
