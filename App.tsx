import React from 'react';
import {SafeAreaView} from 'react-native';

import TabBar from './TabBar';
import {RootStateProvider} from './RootStateContext';

const App: React.FC = () => {
  return (
    <RootStateProvider>
      <SafeAreaView style={{flex: 1}}>
        <TabBar />
      </SafeAreaView>
    </RootStateProvider>
  );
};

export default App;
