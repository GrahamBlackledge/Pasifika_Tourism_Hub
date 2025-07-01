import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

const [,, email] = process.argv;
if (!email) {
  console.error('Usage: node scripts/setAdmin.js you@domain.com');
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve('./serviceAccountKey.json'), 'utf8')
);

initializeApp({ credential: cert(serviceAccount) });

(async () => {
  try {
    const user = await getAuth().getUserByEmail(email);
    await getAuth().setCustomUserClaims(user.uid, { admin: true });
    console.log(` ${email} is now an admin`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();