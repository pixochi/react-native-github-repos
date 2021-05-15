import {Endpoints} from '@octokit/types';

import * as Helpers from '../helpers';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_REPOS_ENDPOINT = '/search/repositories';

type GetRepositoriesEndpoint = Endpoints[`GET ${typeof GITHUB_REPOS_ENDPOINT}`];

export const fetchGithubRepos = async (page: number) => {
  const endpointParams: Required<GetRepositoriesEndpoint['parameters']> = {
    q: 'stars:>1',
    sort: 'stars',
    order: 'desc',
    per_page: 10,
    page,
  };

  const searchParams = Helpers.buildSearchParams(endpointParams);

  // TODO: add error handling
  const response = await fetch(
    `${GITHUB_API_URL}${GITHUB_REPOS_ENDPOINT}?${searchParams}`,
  );
  const parsedResponse: GetRepositoriesEndpoint['response']['data'] = await response.json();

  return parsedResponse.items;
};
