import React, {useLayoutEffect} from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer} from 'mobx-react-lite';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useRootStore} from '../../RootStateContext';

import * as Helpers from './helpers';
import * as Types from './types';

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

  return (
    <View style={{padding: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>{selectedRepo.full_name}</Text>
      </View>
      <View style={{marginTop: 8, flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: selectedRepo.owner.avatar_url,
          }}
          style={{width: 28, height: 28}}
        />
        <Text style={{marginLeft: 8}}>{selectedRepo.owner.login}</Text>
      </View>
      <Text style={{marginTop: 20}}>{selectedRepo.description}</Text>
      <View style={{flexDirection: 'row', marginTop: 12}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{Helpers.normalizeCount(selectedRepo.stargazers_count)}</Text>
          <Icon style={{marginLeft: 4}} name="star" size={16} color="#f4b840" />
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
      <TouchableOpacity
        onPress={() => favoriteReposStore.addToFavoriteRepos(selectedRepo)}>
        <Icon name="heart" size={32} color="#ed4956" />
      </TouchableOpacity>
    </View>
  );
});

export default ItemDetail;
