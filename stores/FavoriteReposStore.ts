import {observable, action, makeObservable, runInAction} from 'mobx';

import * as GitHubTypes from '../components/GitHubRepos/types';
import * as FavouritesHelpers from '../Favourites/helpers';

export interface FavoriteRepos {
  [repoId: number]: GitHubTypes.GitHubRepo;
}

class FavoriteReposStore {
  @observable favoriteRepos: FavoriteRepos = {};
  @observable isLoading = false;

  constructor() {
    makeObservable(this);
  }

  @action
  loadFavoriteRepos = async () => {
    this.isLoading = true;
    const favoriteRepos = await FavouritesHelpers.getFavoriteRepos();

    runInAction(() => {
      this.favoriteRepos = favoriteRepos || {};
      this.isLoading = false;
    });
  };

  @action
  addToFavoriteRepos = async (repo: GitHubTypes.GitHubRepo) => {
    this.favoriteRepos[repo.id] = repo;
    await FavouritesHelpers.addRepoToFavorites(repo);
  };

  @action
  removeFromFavoriteRepos = async (repoId: number) => {
    delete this.favoriteRepos[repoId];
    await FavouritesHelpers.removeRepoFromFavorites(repoId);
  };
}

export default FavoriteReposStore;
