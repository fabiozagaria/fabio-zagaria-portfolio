#!/usr/bin/env node
// Tiene allineati il PDF del CV e i suoi dati (data e impronta) in src/app/data/cv.data.ts.
//
//   npm run cv:meta -- 2026-11-22   dopo aver rigenerato il PDF: aggiorna data e impronta
//   npm run cv:check                controlla che il PDF corrisponda ai dati (fa parte di test:ci)
//
// La data è quella in cui sono cambiati i CONTENUTI del CV (di solito oggi). Se il PDF non è
// cambiato rispetto all'impronta già registrata, non succede niente: la data resta quella.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pdfPath = resolve(root, 'src/assets/documents/CV.pdf');
const dataPath = resolve(root, 'src/app/data/cv.data.ts');

const fail = (message) => {
  console.error(`Errore: ${message}`);
  process.exit(1);
};

const arg = process.argv[2];
const checkOnly = arg === '--check';
const date = checkOnly ? undefined : arg;
const source = readFileSync(dataPath, 'utf8');
const currentDate = source.match(/updatedAt: '(\d{4}-\d{2}-\d{2})'/)?.[1];
const currentSha = source.match(/sha256: '([0-9a-f]{64})'/)?.[1];
if (!currentDate || !currentSha)
  fail('non trovo updatedAt e sha256 in cv.data.ts: il formato è cambiato?');

const sha = createHash('sha256').update(readFileSync(pdfPath)).digest('hex');
if (checkOnly) {
  if (sha === currentSha) {
    console.log(
      `CV coerente con cv.data.ts (aggiornato il ${currentDate}, sha256 ${sha.slice(0, 8)}).`,
    );
    process.exit(0);
  }
  console.error(
    `Il CV (src/assets/documents/CV.pdf, sha256 ${sha.slice(0, 8)}) è diverso da quello registrato in cv.data.ts (${currentSha.slice(0, 8)}, aggiornato il ${currentDate}).\n` +
      'Se hai rigenerato il CV: npm run cv:meta -- AAAA-MM-GG (la data in cui sono cambiati i contenuti), poi copia lo stesso PDF nel repository del curriculum.\n' +
      'Se non volevi cambiarlo: ripristina il PDF precedente.',
  );
  process.exit(1);
}
if (sha === currentSha) {
  console.log(`Il PDF non è cambiato (sha256 ${sha.slice(0, 8)}): data invariata, ${currentDate}.`);
  process.exit(0);
}

if (!date)
  fail(
    "il PDF è cambiato: indica la data dell'aggiornamento, per esempio npm run cv:meta -- 2026-11-22",
  );
if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
  fail(`la data «${date}» non è nel formato AAAA-MM-GG`);
}
if (date < currentDate)
  fail(`la data ${date} è precedente all'ultimo aggiornamento (${currentDate})`);
const tomorrow = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10);
if (date > tomorrow) fail(`la data ${date} è nel futuro`);

writeFileSync(
  dataPath,
  source
    .replace(`updatedAt: '${currentDate}'`, `updatedAt: '${date}'`)
    .replace(`sha256: '${currentSha}'`, `sha256: '${sha}'`),
);
console.log(
  `CV aggiornato: ${currentDate} (${currentSha.slice(0, 8)}) -> ${date} (${sha.slice(0, 8)}).`,
);
console.log(
  'Ora: copia lo stesso PDF nel repository del curriculum (archivio, CHANGELOG, tag) e fai commit.',
);
