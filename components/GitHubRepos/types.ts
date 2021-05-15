import {Endpoints} from '@octokit/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export enum Screens {
  ReposList = 'ReposList',
  RepoDetail = 'RepoDetail',
}

export type GitHubRepo = Endpoints['GET /search/repositories']['response']['data']['items'][0];
export type GitHubRepos = GitHubRepo[];

export type RootStackParamList = {
  ReposList: {};
  RepoDetail: {repoId: number};
};

export type StackScreenComponentProps<StackScreenName extends Screens> = {
  route: RouteProp<RootStackParamList, StackScreenName>;
  navigation: StackNavigationProp<RootStackParamList, StackScreenName>;
};
