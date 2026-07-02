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

// Read credentials from admin-credentials.json to authenticate
const credPath = join(__dirname, '../src/data/admin-credentials.json');
const { email, password } = JSON.parse(readFileSync(credPath, 'utf-8'));

// Read content.json data
const contentPath = join(__dirname, '../src/data/content.json');
const content = JSON.parse(readFileSync(contentPath, 'utf-8'));

console.log(`🔑 Authenticating as ${email}...`);

try {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    throw new Error(`Authentication failed: ${authError.message}`);
  }

  console.log("✅ Authenticated successfully!");
  console.log("Uploading portfolio data to Supabase (upserting 'content' document)...");

  // Attempt to upsert (insert or update) the portfolio row
  const { error: upsertError } = await supabase
    .from('portfolio')
    .upsert({ id: 'content', data: content }, { onConflict: 'id' });

  if (upsertError) {
    throw upsertError;
  }

  console.log("✅ Successfully seeded Supabase with content.json data!");
  process.exit(0);
} catch (err) {
  console.error("❌ Failed to seed Supabase database:", err.message);
  console.log("\nIf this failed due to RLS policies or authentication issues, ensure you have:");
  console.log("1. Executed the schema in supabase-schema.sql inside the Supabase SQL Editor.");
  console.log("2. Created the admin user by running: npm run supabase:create-admin");
  process.exit(1);
}
