#!/usr/bin/env node
// npm run cv:meta -- AAAA-MM-GG [it|en] registra un nuovo PDF.
// npm run cv:check confronta i checksum di entrambi i PDF con cv.data.ts.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const versions = {
  it: { pdf: 'CV.pdf', constant: 'CV' },
  en: { pdf: 'CV-en.pdf', constant: 'CV_EN' },
};
const dataPath = fileURLToPath(new URL('../src/app/data/cv.data.ts', import.meta.url));
const source = readFileSync(dataPath, 'utf8');
const [date, language = 'it'] = process.argv.slice(2);

function fail(message) {
  console.error(`Errore: ${message}`);
  process.exit(1);
}

function versionFor(language) {
  const { pdf, constant } = versions[language];
  const match = source.match(
    new RegExp(
      `export const ${constant} = \\{\\s*updatedAt: '(\\d{4}-\\d{2}-\\d{2})',\\s*sha256: '([0-9a-f]{64})'`,
    ),
  );
  if (!match) fail(`non trovo la versione ${language} in cv.data.ts.`);

  const [, currentDate, currentSha] = match;
  const path = new URL(`../src/assets/documents/${pdf}`, import.meta.url);
  const sha = createHash('sha256').update(readFileSync(path)).digest('hex');
  return { pdf, entry: match[0], currentDate, currentSha, sha };
}

if (date === '--check') {
  for (const language of Object.keys(versions)) {
    const { pdf, currentDate, currentSha, sha } = versionFor(language);
    if (sha !== currentSha) {
      fail(
        `${pdf} (sha256 ${sha.slice(0, 8)}) non corrisponde a cv.data.ts (${currentSha.slice(0, 8)}). Registra la versione con npm run cv:meta -- AAAA-MM-GG ${language}.`,
      );
    }
    console.log(
      `${pdf} coerente con cv.data.ts (aggiornato il ${currentDate}, sha256 ${sha.slice(0, 8)}).`,
    );
  }
  process.exit(0);
}

if (!Object.hasOwn(versions, language)) fail('la lingua del CV deve essere it oppure en.');
const { pdf, entry, currentDate, currentSha, sha } = versionFor(language);
if (sha === currentSha) {
  console.log(`${pdf} invariato (sha256 ${sha.slice(0, 8)}), data ${currentDate}.`);
  process.exit(0);
}

const parsedDate = new Date(`${date}T00:00:00Z`);
if (
  !/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') ||
  Number.isNaN(parsedDate.getTime()) ||
  parsedDate.toISOString().slice(0, 10) !== date
) {
  fail('indica la data dei contenuti nel formato AAAA-MM-GG.');
}
if (date < currentDate) fail(`la data ${date} precede l’ultimo aggiornamento (${currentDate}).`);
const tomorrow = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10);
if (date > tomorrow) fail(`la data ${date} è nel futuro.`);

writeFileSync(
  dataPath,
  source.replace(entry, entry.replace(currentDate, date).replace(currentSha, sha)),
);
console.log(
  `${pdf} registrato con data ${date} e sha256 ${sha.slice(0, 8)}. Sincronizza lo stesso PDF nel repository del curriculum.`,
);
