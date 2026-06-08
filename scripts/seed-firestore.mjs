import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: "AIzaSyCQmX0uMo2MA1gnnBqWlcYNbA7etVDIz50",
  authDomain: "portfolio-6be4a.firebaseapp.com",
  projectId: "portfolio-6be4a",
  storageBucket: "portfolio-6be4a.firebasestorage.app",
  messagingSenderId: "740813207245",
  appId: "1:740813207245:web:7c93bf1e885ac1bbd39b84",
  measurementId: "G-TY77WGDVPS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contentPath = join(__dirname, '../src/data/content.json');
const content = JSON.parse(readFileSync(contentPath, 'utf-8'));

console.log('Uploading portfolio data to Firestore...');

try {
  await setDoc(doc(db, 'portfolio', 'content'), content);
  console.log('✅ Successfully seeded Firestore with content.json data!');
  process.exit(0);
} catch (err) {
  console.error('❌ Failed to seed Firestore:', err.message);
  process.exit(1);
}
