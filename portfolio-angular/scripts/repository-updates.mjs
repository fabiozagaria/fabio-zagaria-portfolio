import { readFile, writeFile } from 'node:fs/promises';

const username = 'fabiozagaria';
const sources = [
  {
    file: 'src/app/data/projects.data.ts',
    pattern: /category: '(?:Full stack|Backend|Frontend)'[\s\S]*?repositories: \[([\s\S]*?)\]/g,
  },
  {
    file: 'src/app/data/project-collections.data.ts',
    pattern: /export const AI_PLUGINS = \[([\s\S]*?)\] as const[\s\S]*?export const EXPERIMENTAL_PROJECTS = \[([\s\S]*?)\] as const/g,
  },
];
const outputPath = 'src/assets/data/repository-updates.json';
const previousOutputPath = new URL('../src/assets/data/repository-updates.json', import.meta.url);
const excludedRepositories = new Set(['fabio-zagaria-portfolio']);

function repositoryNames(source, sectionPattern) {
  const repositories = new Set();
  const sections = [...source.matchAll(sectionPattern)].flatMap((match) => match.slice(1));

  for (const section of sections) {
    for (const match of section.matchAll(/https:\/\/github\.com\/fabiozagaria\/([a-zA-Z0-9_.-]+)/g)) {
      if (!excludedRepositories.has(match[1])) repositories.add(match[1]);
    }
  }

  return [...repositories];
}

function dateLabel(date) {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(date);
}

async function latestCommit(repository) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repository}/commits?per_page=1`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    },
  );

  if (!response.ok) throw new Error(`GitHub API ${response.status} per ${repository}`);

  const payload = await response.json();
  if (!Array.isArray(payload)) throw new Error(`Risposta GitHub non valida per ${repository}`);
  const [commit] = payload;
  if (!commit) return null;

  const datetime = commit.commit.committer?.date ?? commit.commit.author.date;
  const date = new Date(datetime);

  return {
    repository,
    datetime,
    dateLabel: dateLabel(date),
    items: [
      {
        kind: 'Repository',
        hash: commit.sha.slice(0, 7),
        message: commit.commit.message.split('\n')[0],
        dateLabel: dateLabel(date),
        url: commit.html_url,
      },
    ],
  };
}

const results = [];
const failures = [];
for (const { file, pattern } of sources) {
  const source = await readFile(file, 'utf8');
  for (const repository of repositoryNames(source, pattern)) {
    try {
      const update = await latestCommit(repository);
      if (update) results.push(update);
    } catch (error) {
      failures.push(error.message);
    }
  }
}

if (failures.length) {
  throw new Error(`Aggiornamento interrotto, nessun dato pubblicato. ${failures.join('; ')}`);
}

if (results.length === 0) {
  throw new Error('Nessun repository idoneo trovato, nessun dato pubblicato.');
}

await writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`);
console.log(`Aggiornati ${results.length} repository in ${outputPath}`);
