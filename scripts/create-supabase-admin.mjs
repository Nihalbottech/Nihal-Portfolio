import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Simple parser for .env file
function getEnvKeys() {
  try {
    const envPath = join(__dirname, '../.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const keys = {};
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        keys[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      }
    });
    return keys;
  } catch (err) {
    console.error("❌ Failed to read .env file:", err.message);
    return {};
  }
}

const env = getEnvKeys();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables are missing from .env file.");
  console.log("Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read credentials from admin-credentials.json
const credPath = join(__dirname, '../src/data/admin-credentials.json');
const { email, password } = JSON.parse(readFileSync(credPath, 'utf-8'));

console.log(`👤 Registering Supabase Auth user: ${email}...`);

try {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // If signUp succeeds:
  // Note: if email verification is enabled, user.identities might exist but the user is not confirmed yet.
  if (data.user) {
    console.log(`✅ Supabase Auth user registration requested for: ${data.user.email}`);
    if (data.user.identities && data.user.identities.length === 0) {
      console.log("ℹ️ Note: This user might already exist in your Supabase Auth list.");
    } else {
      console.log("🎉 User created successfully!");
    }
    console.log("\nNext Steps:");
    console.log("1. Disable 'Confirm Email' in Supabase Auth -> Provider settings (or check your email/dashboard to confirm it).");
    console.log("2. Run the seeding script to upload your portfolio data: npm run supabase:seed");
    process.exit(0);
  } else {
    throw new Error("No user returned from signup.");
  }
} catch (err) {
  console.error("❌ Failed to create Supabase user:", err.message);
  process.exit(1);
}
