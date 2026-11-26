import { writeFile } from 'node:fs/promises';
import repositories from '../src/app/data/portfolio-repositories.json' with { type: 'json' };

const username = 'fabiozagaria';
const outputPath = 'src/assets/data/repository-updates.json';

function dateLabel(date) {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(date);
}

async function latestCommit({ repository, kind }) {
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
        kind,
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
for (const repository of repositories) {
  try {
    const update = await latestCommit(repository);
    if (update) results.push(update);
  } catch (error) {
    failures.push(error.message);
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
