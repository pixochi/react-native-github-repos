import {Endpoints} from '@octokit/types';

import * as ApiUtils from '../utils/api';
import * as GitHubTypes from '../components/GitHubRepos/types';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_REPOS_ENDPOINT = '/search/repositories';

type GetRepositoriesEndpoint = Endpoints[`GET ${typeof GITHUB_REPOS_ENDPOINT}`];

export const fetchGithubRepos = async (
  page: number,
): Promise<GitHubTypes.GitHubRepos> => {
  const endpointParams: Required<GetRepositoriesEndpoint['parameters']> = {
    q: 'stars:>1',
    sort: 'stars',
    order: 'desc',
    per_page: 10,
    page,
  };

  const searchParams = ApiUtils.buildSearchParams(endpointParams);

  const response = await fetch(
    `${GITHUB_API_URL}${GITHUB_REPOS_ENDPOINT}?${searchParams}`,
  );

  const parsedResponse: GetRepositoriesEndpoint['response']['data'] = await response.json();

  return parsedResponse.items;
};
