import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const backendDir = path.join(process.cwd(), 'backend');

// Load environment variables from backend/.env into process.env before starting
const envPath = path.join(backendDir, '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const match = trimmed.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value.trim();
    }
  });
  console.log('Loaded environment variables from backend/.env');
}

// 1. Install dependencies and build if node_modules or dist is missing
if (!fs.existsSync(path.join(backendDir, 'node_modules')) || !fs.existsSync(path.join(backendDir, 'dist'))) {
  console.log('Backend build missing. Installing dependencies and building...');
  execSync('npm run install-backend', { stdio: 'inherit' });
}

// 2. Run migrations / DB push depending on schema provider
const schemaPath = path.join(backendDir, 'prisma/schema.prisma');
let isMongodb = false;
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  isMongodb = schemaContent.includes('provider = "mongodb"') || schemaContent.includes('provider = \'mongodb\'');
}

if (isMongodb) {
  console.log('Running Prisma database schema push for MongoDB...');
  try {
    execSync('npx prisma db push', { cwd: backendDir, stdio: 'inherit' });
  } catch (err) {
    console.error('Schema push failed:', err.message);
  }
} else {
  console.log('Running Prisma database migrations...');
  try {
    execSync('npx prisma migrate deploy', { cwd: backendDir, stdio: 'inherit' });
  } catch (err) {
    console.error('Migration failed, starting server anyway:', err.message);
  }
}

// 3. Boot the backend server
console.log('Booting RHX Drive Manager backend...');
await import('./backend/dist/server.js');
