import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import GitHubRepos from '../components/GitHubRepos';
import {useRootStore} from '../RootStateContext';

const Favourites: React.FC = observer(() => {
  const {favoriteReposStore} = useRootStore();

  useEffect(() => {
    favoriteReposStore.loadFavoriteRepos();
  }, [favoriteReposStore]);

  return (
    <GitHubRepos
      repos={Object.values(favoriteReposStore.favoriteRepos)}
      isLoading={favoriteReposStore.isLoading}
    />
  );
});

export default Favourites;
