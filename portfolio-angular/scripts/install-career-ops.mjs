#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = 'https://github.com/career-ops-hq/career-ops.git';
const revision = 'dee72e073c26ff67b4cc946e7f0e3ef030b79de5';
const folder = fileURLToPath(new URL('../.career-ops/', import.meta.url));
const npmCli = process.env.npm_execpath;

function run(command, args, capture = false) {
  const result = spawnSync(command, args, {
    cwd: folder,
    encoding: 'utf8',
    stdio: capture ? 'pipe' : 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(result.stderr?.trim() || `${command} è terminato con errore`);
  return result.stdout?.trim();
}

mkdirSync(folder, { recursive: true });
if (!existsSync(resolve(folder, '.git'))) {
  run('git', ['init', '--quiet']);
  run('git', ['remote', 'add', 'origin', repository]);
}
if (run('git', ['remote', 'get-url', 'origin'], true) !== repository) {
  throw new Error('La cartella .career-ops contiene una copia con un origin differente.');
}
if (!existsSync(resolve(folder, 'package.json'))) {
  run('git', ['fetch', '--quiet', '--depth=1', 'origin', revision]);
  run('git', ['checkout', '--quiet', '--detach', 'FETCH_HEAD']);
}
if (run('git', ['rev-parse', 'HEAD'], true) !== revision) {
  throw new Error(`La cartella .career-ops contiene una versione diversa da ${revision}.`);
}

if (!npmCli) throw new Error('Avvia l’installazione con npm run cv:install.');
run(process.execPath, [npmCli, 'install', '--ignore-scripts', '--no-audit', '--no-fund']);
if (!process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
  process.env.PLAYWRIGHT_BROWSERS_PATH ??= '0';
  run(process.execPath, ['node_modules/playwright/cli.js', 'install', 'chromium', '--only-shell']);
}
console.log(`Career Ops installato in ${folder}`);
