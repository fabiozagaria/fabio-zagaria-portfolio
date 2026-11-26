import updates from '../../assets/data/repository-updates.json';
import type { PortfolioUpdateItem } from './projects.data';

export interface RepositoryUpdate {
  readonly repository: string;
  readonly datetime: string;
  readonly dateLabel: string;
  readonly items: readonly PortfolioUpdateItem[];
}

export const REPOSITORY_UPDATES: readonly RepositoryUpdate[] = updates as readonly RepositoryUpdate[];

export function latestRepositoryUpdate(
  repositoryUrl: string | undefined,
): RepositoryUpdate | undefined {
  if (!repositoryUrl) return undefined;
  const repository = repositoryUrl.replace(/\/$/, '').split('/').at(-1);
  const update = REPOSITORY_UPDATES.find((item) => item.repository === repository);
  if (!update) return undefined;

  return {
    ...update,
    items: update.items.map((item) => ({ ...item, kind: 'Repository' })),
  };
}
