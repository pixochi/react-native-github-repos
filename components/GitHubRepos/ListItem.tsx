import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Helpers from './helpers';
import * as Types from './types';

const ListItem: React.FC<{item: Types.GitHubRepo; onPress: () => void}> = ({
  item,
  onPress,
}) => (
  <TouchableHighlight onPress={onPress} underlayColor="#aaa">
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.infoContainer}>
        <Text>{item.language}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.countContainer}>
            <Text>{Helpers.normalizeCount(item.stargazers_count)}</Text>
            <Icon
              style={styles.countIcon}
              name="star"
              size={16}
              color="#f4b840"
            />
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.forkCount}>
              {Helpers.normalizeCount(item.forks_count)}
            </Text>
            <Icon
              style={styles.countIcon}
              name="code-fork"
              size={16}
              color="#f4b840"
            />
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  description: {paddingTop: 4},
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statsContainer: {flexDirection: 'row'},
  countContainer: {flexDirection: 'row'},
  countIcon: {marginLeft: 4},
  forkCount: {marginLeft: 20},
});

export default ListItem;
