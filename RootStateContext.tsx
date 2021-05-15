import React from 'react';

import ReposStore from './stores/ReposStore';
import FavoriteReposStore from './stores/FavoriteReposStore';

type RootStateContextValue = {
  reposStore: ReposStore;
  favoriteReposStore: FavoriteReposStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue,
);

const stores: RootStateContextValue = {
  reposStore: new ReposStore(),
  favoriteReposStore: new FavoriteReposStore(),
};

export const RootStateProvider: React.FC = ({children}) => {
  return (
    <RootStateContext.Provider value={stores}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
