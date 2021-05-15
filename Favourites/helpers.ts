import * as DeviceStorageService from '../services/deviceStorageService';
import * as GitHubTypes from '../components/GitHubRepos/types';
import {FavoriteRepos} from '../stores/FavoriteReposStore';

const STORAGE_KEY = 'favoriteRepos';

export const getFavoriteRepos = async () => {
  const storedRepos: FavoriteRepos = await DeviceStorageService.getData(
    STORAGE_KEY,
  );

  return storedRepos || {};
};

export const addRepoToFavorites = async (repo: GitHubTypes.GitHubRepo) => {
  const favoriteRepos = await getFavoriteRepos();
  favoriteRepos[repo.id] = repo;

  await DeviceStorageService.storeData(STORAGE_KEY, favoriteRepos);
};

export const removeRepoFromFavorites = async (repoId: number) => {
  const favoriteRepos = await getFavoriteRepos();
  delete favoriteRepos[repoId];

  await DeviceStorageService.storeData(STORAGE_KEY, favoriteRepos);
};
