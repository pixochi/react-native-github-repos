import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as Types from './types';
import List from './List';
import ItemDetail from './ItemDetail';

const Stack = createStackNavigator<Types.RootStackParamList>();

const GitHubRepos: React.FC<{
  repos: Types.GitHubRepos;
  isLoading: boolean;
  loadMoreRepos?: () => void;
}> = ({repos, isLoading, loadMoreRepos}) => {
  return (
    <Stack.Navigator initialRouteName={Types.Screens.ReposList}>
      <Stack.Screen
        name={Types.Screens.ReposList}
        children={() => (
          <List
            repos={repos}
            isLoading={isLoading}
            loadMoreRepos={loadMoreRepos}
          />
        )}
        options={{headerShown: false, title: 'Back'}}
      />
      <Stack.Screen
        name={Types.Screens.RepoDetail}
        component={ItemDetail}
        options={{headerShown: true, title: ''}}
      />
    </Stack.Navigator>
  );
};

export default GitHubRepos;
