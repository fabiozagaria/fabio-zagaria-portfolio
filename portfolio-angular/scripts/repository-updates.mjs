import { writeFile } from 'node:fs/promises';
import repositories from '../src/app/data/portfolio-repositories.json' with { type: 'json' };
import intelligenzaUmana from '../src/app/data/intelligenza-umana-repositories.json' with { type: 'json' };

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

async function latestCommit({ repository, kind, owner }) {
  const fullName = `${owner ?? username}/${repository}`;
  const token = owner ? undefined : process.env.GITHUB_TOKEN;
  const response = await fetch(
    `https://api.github.com/repos/${fullName}/commits?per_page=1`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!response.ok) throw new Error(`GitHub API ${response.status} per ${fullName}`);

  const payload = await response.json();
  if (!Array.isArray(payload)) throw new Error(`Risposta GitHub non valida per ${fullName}`);
  const [commit] = payload;
  if (!commit) return null;

  const datetime = commit.commit.committer?.date ?? commit.commit.author.date;
  const date = new Date(datetime);

  return {
    ...(owner ? { owner } : {}),
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
const allRepositories = [
  ...repositories,
  ...intelligenzaUmana.repositories.map((entry) => ({ ...entry, owner: intelligenzaUmana.owner })),
];
for (const repository of allRepositories) {
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
