import {observer} from 'mobx-react';
import React from 'react';

import GitHubRepos from '../components/GitHubRepos';
import {useRootStore} from '../RootStateContext';

const Favourites: React.FC = observer(() => {
  const {favoriteReposStore} = useRootStore();

  return (
    <GitHubRepos repos={favoriteReposStore.favoriteRepos} isLoading={false} />
  );
});

export default Favourites;
