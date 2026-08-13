import { writeFile } from 'node:fs/promises';

const USERNAME = 'fabiozagaria';
const YEAR = 2026;
const OUTPUT_PATH = new URL('../src/app/data/github-activity.data.ts', import.meta.url);
const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error('GITHUB_TOKEN is required');
}

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'User-Agent': 'fabio-zagaria-portfolio',
  'X-GitHub-Api-Version': '2022-11-28',
};

const query = encodeURIComponent(`author:${USERNAME} committer-date:${YEAR}-01-01..${YEAR}-12-31`);
const commits = [];
let page = 1;
let totalCount = 0;

do {
  const response = await fetch(
    `https://api.github.com/search/commits?q=${query}&sort=committer-date&order=asc&per_page=100&page=${page}`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
  }

  const payload = await response.json();
  totalCount = payload.total_count;
  commits.push(...payload.items);
  page += 1;
} while (commits.length < totalCount && page <= 10);

if (totalCount > 1000) {
  throw new Error('The GitHub commit search exceeded the 1,000-result API limit');
}

const uniqueCommits = new Map(commits.map((item) => [item.sha, item]));
const dailyCounts = new Map();

for (const item of uniqueCommits.values()) {
  const committedAt = item.commit.committer?.date ?? item.commit.author?.date;
  if (!committedAt) continue;

  const date = committedAt.slice(0, 10);
  dailyCounts.set(date, (dailyCounts.get(date) ?? 0) + 1);
}

const snapshotDate = getRomeDate(new Date());
const streakCutoff = getPreviousCompletedWeekday(snapshotDate);
const daily = [...dailyCounts.entries()]
  .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
  .map(([date, count]) => `    { date: '${date}', count: ${count} },`)
  .join('\n');
const content = `export const GITHUB_ACTIVITY = {
  username: '${USERNAME}',
  year: ${YEAR},
  snapshotDate: '${snapshotDate}',
  streakCutoff: '${streakCutoff}',
  generatedAt: '${new Date().toISOString()}',
  daily: [
${daily}
  ],
} as const;
`;

await writeFile(OUTPUT_PATH, content, 'utf8');

function getRomeDate(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function getPreviousCompletedWeekday(date) {
  const cursor = new Date(`${date}T00:00:00Z`);
  cursor.setUTCDate(cursor.getUTCDate() - 1);

  while (cursor.getUTCDay() === 0 || cursor.getUTCDay() === 6) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return cursor.toISOString().slice(0, 10);
}
