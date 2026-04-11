/**
 * Inserts root-level "email" after each "name" line by copying company.email.
 * Fixes E11000 duplicate key on email: null when a unique index exists on email.
 *
 * Usage: node scripts/fix-playground-users-email.js <path-to-playground-4.mongodb.js> [--write]
 * Without --write, writes <name-without-.js>.fixed.js next to the input
 * (e.g. playground-4.mongodb.js -> playground-4.mongodb.fixed.js).
 * With --write, overwrites the input file (backup recommended).
 *
 * Optional: --with-auth adds placeholder password and salt lines (for Mongoose seeding).
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const writeInPlace = args.includes('--write');
const withAuth = args.includes('--with-auth');
const fileArg = args.find((a) => {
  return !a.startsWith('--');
});

if (!fileArg) {
  console.error(
    'Usage: node scripts/fix-playground-users-email.js <playground-4.mongodb.js> [--write] [--with-auth]'
  );
  process.exit(1);
}

const inputPath = path.resolve(fileArg);

if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

const src = fs.readFileSync(inputPath, 'utf8');
const lines = src.split(/\n/);
const out = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  out.push(line);

  const nameMatch = /^(\s*)"name":\s*"[^"]*",?\s*$/.exec(line);
  if (!nameMatch) {
    continue;
  }

  const nextLine = lines[i + 1] ?? '';
  if (/^\s*"email":\s*"/.test(nextLine)) {
    continue;
  }

  const indent = nameMatch[1];
  let email = null;

  for (let j = i + 1; j < Math.min(i + 120, lines.length); j++) {
    if (lines[j].includes('"company":')) {
      for (let k = j; k < Math.min(j + 30, lines.length); k++) {
        const em = /^\s*"email":\s*"([^"]+)"\s*,?\s*$/.exec(lines[k]);
        if (em) {
          email = em[1];
          break;
        }
      }
      break;
    }
  }

  if (!email) {
    console.warn(`Warning: no company email found after name near line ${i + 1}`);
    continue;
  }

  out.push(`${indent}"email": "${email}",`);
  if (withAuth) {
    out.push(`${indent}"password": "changeme",`);
    out.push(`${indent}"salt": "playground-seed",`);
  }
}

const result = out.join('\n');

let outPath;
if (writeInPlace) {
  outPath = inputPath;
} else {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);
  outPath = path.join(dir, `${base}.fixed${ext}`);
}

fs.writeFileSync(outPath, result, 'utf8');
console.log(`Wrote ${outPath}`);
