import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import TabBar from './TabBar';
import {RootStateProvider} from './RootStateContext';

const App: React.FC = () => {
  return (
    <RootStateProvider>
      <SafeAreaView style={styles.container}>
        <TabBar />
      </SafeAreaView>
    </RootStateProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
