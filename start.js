import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const backendDir = path.join(process.cwd(), 'backend');

// 1. Install dependencies and build if node_modules or dist is missing
if (!fs.existsSync(path.join(backendDir, 'node_modules')) || !fs.existsSync(path.join(backendDir, 'dist'))) {
  console.log('Backend build missing. Installing dependencies and building...');
  execSync('npm run install-backend', { stdio: 'inherit' });
}

// 2. Run migrations
console.log('Running Prisma database migrations...');
try {
  execSync('npx prisma migrate deploy', { cwd: backendDir, stdio: 'inherit' });
} catch (err) {
  console.error('Migration failed, starting server anyway:', err.message);
}

// 3. Boot the backend server
console.log('Booting RHX Drive Manager backend...');
await import('./backend/dist/server.js');
