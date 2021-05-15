import * as DeviceStorageService from '../services/deviceStorageService';
import * as Types from '../components/GitHubRepos/types';

const STORAGE_KEY = 'favoriteRepos';

export const getFavoriteRepos = async () => {
  const storedRepos: Types.GitHubRepos = await DeviceStorageService.getData(
    STORAGE_KEY,
  );

  return storedRepos;
};

export const addRepoToFavorites = async (repo: Types.GitHubRepo) => {
  const storedRepos = await getFavoriteRepos();
  const updatedRepos = (storedRepos || []).concat(repo);

  await DeviceStorageService.storeData(STORAGE_KEY, updatedRepos);
};

export const removeRepoFromFavorites = async (repoId: number) => {
  const storedRepos = await getFavoriteRepos();
  const updatedRepos = storedRepos.filter(repo => repo.id !== repoId);

  await DeviceStorageService.storeData(STORAGE_KEY, updatedRepos);
};
