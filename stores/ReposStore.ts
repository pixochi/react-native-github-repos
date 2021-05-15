import {observable, action, makeObservable, runInAction} from 'mobx';

import {GitHubRepos} from '../components/GitHubRepos/types';
import * as API from '../MostStarredRepos/api';

class ReposStore {
  @observable repos: GitHubRepos = [];
  @observable isFetchingRepos = false;
  @observable isFetchingMoreRepos = false;
  _fetchedPagesCount = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  fetchRepos = async () => {
    this.isFetchingRepos = true;
    // TODO: add error handling
    const repos = await API.fetchGithubRepos(1);

    runInAction(() => {
      this.repos = repos;
      this.isFetchingRepos = false;
      this._fetchedPagesCount++;
    });
  };

  @action
  fetchMoreRepos = async () => {
    this.isFetchingMoreRepos = true;
    // TODO: add error handling
    const repos = await API.fetchGithubRepos(this._fetchedPagesCount + 1);

    runInAction(() => {
      this.repos.push(...repos);
      this.isFetchingMoreRepos = false;
      this._fetchedPagesCount++;
    });
  };
}

export default ReposStore;
