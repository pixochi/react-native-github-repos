import React, {useLayoutEffect} from 'react';
import {Image, Linking, Text, View} from 'react-native';
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

  return (
    <View style={{padding: 20, backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{fontSize: 28}}
          onPress={() => Linking.openURL(selectedRepo.html_url)}>
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

      <Text style={{marginTop: 16, fontSize: 16}}>
        {selectedRepo.description}
      </Text>
      <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: selectedRepo.owner.avatar_url,
          }}
          style={{width: 28, height: 28}}
        />
        <Text style={{marginLeft: 8, fontSize: 16}}>
          {selectedRepo.owner.login}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 4,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text>{Helpers.normalizeCount(selectedRepo.stargazers_count)}</Text>
            <Icon
              style={{marginLeft: 4}}
              name="star"
              size={16}
              color="#f4b840"
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 20}}>
              {Helpers.normalizeCount(selectedRepo.forks_count)}
            </Text>
            <Icon
              style={{marginLeft: 4}}
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

export default ItemDetail;
