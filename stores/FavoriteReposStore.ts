import {observable, action, makeObservable} from 'mobx';

import * as Types from '../components/GitHubRepos/types';
import * as Helpers from '../Favourites/helpers';

class FavoriteReposStore {
  @observable favoriteRepos: Types.GitHubRepos = [];

  constructor() {
    makeObservable(this);
  }

  @action
  loadFavoriteRepos = async () => {
    const favoriteRepos = await Helpers.getFavoriteRepos();
    this.favoriteRepos = favoriteRepos;
  };

  @action
  addToFavoriteRepos = async (repo: Types.GitHubRepo) => {
    this.favoriteRepos.push(repo);
    await Helpers.addRepoToFavorites(repo);
  };

  @action
  removeFromFavoriteRepos = async (repoId: number) => {
    this.favoriteRepos = this.favoriteRepos.filter(repo => repo.id !== repoId);
    await Helpers.removeRepoFromFavorites(repoId);
  };
}

export default FavoriteReposStore;
