import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
  appId: "1:740813207245:web:7c93bf1e885ac1bbd39b84"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Read credentials from admin-credentials.json
const credPath = join(__dirname, '../src/data/admin-credentials.json');
const { email, password } = JSON.parse(readFileSync(credPath, 'utf-8'));

console.log(`Creating Firebase Auth user: ${email}`);

try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log(`✅ Firebase Auth user created: ${userCredential.user.email}`);
  console.log('You can now log in to the admin panel with your credentials!');
  process.exit(0);
} catch (err) {
  if (err.code === 'auth/email-already-in-use') {
    console.log('✅ Firebase Auth user already exists — no action needed!');
    process.exit(0);
  }
  console.error('❌ Failed to create user:', err.message);
  process.exit(1);
}
