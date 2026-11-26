import updates from '../../assets/data/repository-updates.json';
import repositories from './portfolio-repositories.json';
import type {
  PortfolioLatestUpdate,
  PortfolioRepository,
  PortfolioUpdateItem,
} from './projects.data';

export interface RepositoryUpdate {
  readonly repository: string;
  readonly datetime: string;
  readonly dateLabel: string;
  readonly items: readonly PortfolioUpdateItem[];
}

export const REPOSITORY_UPDATES = updates as unknown as readonly RepositoryUpdate[];
const portfolioRepositories = repositories as unknown as readonly {
  readonly repository: string;
  readonly kind: PortfolioUpdateItem['kind'];
}[];

export function latestRepositoryUpdate(
  projectRepositories: readonly PortfolioRepository[] | undefined,
  previousUpdate: PortfolioLatestUpdate | undefined,
): PortfolioLatestUpdate | undefined {
  if (!projectRepositories?.length) return previousUpdate;

  const repositoryName = (url: string) => url.replace(/\/$/, '').split('/').at(-1) ?? '';
  const projectRepositoryNames = projectRepositories.map((repository) =>
    repositoryName(repository.url),
  );
  const previousRepositoryNames = previousUpdate?.items?.map((item) => repositoryName(item.url)) ?? [];
  const orderedRepositoryNames = [
    ...previousRepositoryNames,
    ...projectRepositoryNames,
  ].filter((repository, index, all) => {
    return projectRepositoryNames.includes(repository) && all.indexOf(repository) === index;
  });

  const matchingUpdates = orderedRepositoryNames.flatMap((repository) => {
    const projectRepository = projectRepositories.find((item) => {
      return repositoryName(item.url) === repository;
    });
    const update = REPOSITORY_UPDATES.find((item) => item.repository === repository);
    const manifestEntry = portfolioRepositories.find((item) => item.repository === repository);
    if (!projectRepository || !update || !manifestEntry) return [];

    const previousItem = previousUpdate?.items?.find((item) => {
      return item.url.includes(`/${repository}/commit/`);
    });

    return update.items.map((item) => ({
      update,
      item: {
        ...item,
        kind: manifestEntry.kind,
        version: previousItem?.version,
      },
    }));
  });

  if (!matchingUpdates.length) return previousUpdate;
  const latestDatetime = matchingUpdates.reduce((latest, current) => {
    return current.update.datetime > latest ? current.update.datetime : latest;
  }, matchingUpdates[0].update.datetime);

  const latestUpdate = matchingUpdates.find((current) => current.update.datetime === latestDatetime);

  return {
    datetime: latestDatetime,
    dateLabel: latestUpdate?.update.dateLabel ?? '',
    version: previousUpdate?.version,
    items: matchingUpdates.map(({ item }) => item),
  };
}
