import React, {useLayoutEffect} from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer} from 'mobx-react-lite';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useRootStore} from '../../RootStateContext';

import * as Helpers from './helpers';
import * as Types from './types';
import ShareRepoButton from './ShareRepoButton';

type DetailScreenNavigationProps = Types.StackScreenComponentProps<Types.Screens.RepoDetail>;

const ItemDetail: React.FC = observer(() => {
  const {reposStore, favoriteReposStore} = useRootStore();

  const navigation = useNavigation<DetailScreenNavigationProps['navigation']>();
  const route = useRoute<DetailScreenNavigationProps['route']>();

  const selectedRepo = reposStore.repos.find(
    repo => repo.id === route.params.repoId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedRepo?.name,
    });
  }, [navigation, selectedRepo]);

  if (!selectedRepo) {
    return (
      <View>
        <Text>Repository not found</Text>
      </View>
    );
  }

  const isFavorite =
    favoriteReposStore.favoriteRepos[selectedRepo.id] !== undefined;

  const toggleFavorite = async () => {
    if (isFavorite) {
      favoriteReposStore.removeFromFavoriteRepos(selectedRepo.id);
    } else {
      favoriteReposStore.addToFavoriteRepos(selectedRepo);
    }
  };

  const openRepoURL = () => {
    Linking.openURL(selectedRepo.html_url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.repoName} onPress={openRepoURL}>
          {selectedRepo.full_name}
        </Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name="heart"
            size={32}
            color={isFavorite ? '#ed4956' : '#777'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{selectedRepo.description}</Text>
      <View style={styles.ownerContainer}>
        <Image
          source={{
            uri: selectedRepo.owner.avatar_url,
          }}
          style={styles.ownerImage}
        />
        <Text style={styles.ownerLogin}>{selectedRepo.owner.login}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.countContainer}>
            <Text>{Helpers.normalizeCount(selectedRepo.stargazers_count)}</Text>
            <Icon
              style={styles.countIcon}
              name="star"
              size={16}
              color="#f4b840"
            />
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.forksCount}>
              {Helpers.normalizeCount(selectedRepo.forks_count)}
            </Text>
            <Icon
              style={styles.countIcon}
              name="code-fork"
              size={16}
              color="#f4b840"
            />
          </View>
        </View>
        <ShareRepoButton
          repoName={selectedRepo.name}
          repoUrl={selectedRepo.html_url}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: '#fff', flex: 1},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  repoName: {fontSize: 28, paddingRight: 20},
  description: {marginTop: 16, fontSize: 16},
  ownerContainer: {marginTop: 16, flexDirection: 'row', alignItems: 'center'},
  ownerImage: {width: 28, height: 28},
  ownerLogin: {marginLeft: 8, fontSize: 16},
  infoContainer: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
  },
  statsContainer: {flexDirection: 'row', alignItems: 'center'},
  countContainer: {flexDirection: 'row'},
  countIcon: {marginLeft: 4},
  forksCount: {marginLeft: 20},
});

export default ItemDetail;
