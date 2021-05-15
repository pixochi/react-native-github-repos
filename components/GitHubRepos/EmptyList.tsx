import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EmptyList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>No GitHub repositories available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100%',
  },
});

export default EmptyList;
