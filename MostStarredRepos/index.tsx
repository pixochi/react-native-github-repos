import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {useRootStore} from '../RootStateContext';
import GitHubRepos from '../components/GitHubRepos';

const MostStarredRepos: React.FC = observer(() => {
  const {reposStore} = useRootStore();

  useEffect(() => {
    reposStore.fetchRepos();
  }, [reposStore]);

  return (
    <GitHubRepos
      repos={reposStore.repos}
      isLoading={reposStore.isFetchingRepos}
      loadMoreRepos={reposStore.fetchMoreRepos}
    />
  );
});

export default MostStarredRepos;
