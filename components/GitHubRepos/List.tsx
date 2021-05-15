import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import * as Types from './types';
import EmptyList from './EmptyList';
import ListItem from './ListItem';

type ListScreenNavigationProps = Types.StackScreenComponentProps<Types.Screens.ReposList>;

const List: React.FC<{
  repos: Types.GitHubRepos;
  isLoading: boolean;
  loadMoreRepos?: () => void;
}> = ({repos, isLoading, loadMoreRepos}) => {
  const navigation = useNavigation<ListScreenNavigationProps['navigation']>();

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <FlatList
      data={repos}
      renderItem={({item}) => (
        <ListItem
          item={item}
          onPress={() =>
            navigation.navigate(Types.Screens.RepoDetail, {
              repoId: item.id,
            })
          }
        />
      )}
      keyExtractor={item => String(item.id)}
      ListEmptyComponent={EmptyList}
      onEndReached={loadMoreRepos}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100%',
  },
});

export default List;
