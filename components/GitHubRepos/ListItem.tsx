import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Helpers from './helpers';
import * as Types from './types';

const ListItem: React.FC<{item: Types.GitHubRepo; onPress: () => void}> = ({
  item,
  onPress,
}) => (
  <TouchableHighlight onPress={onPress} underlayColor="#e3e3e3">
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.statsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text>{item.language}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <Text>{Helpers.normalizeCount(item.stargazers_count)}</Text>
              <Icon
                style={{marginLeft: 4}}
                name="star"
                size={16}
                color="#f4b840"
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginLeft: 20}}>
                {Helpers.normalizeCount(item.forks_count)}
              </Text>
              <Icon
                style={{marginLeft: 4}}
                name="code-fork"
                size={16}
                color="#f4b840"
              />
            </View>
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
  },
  title: {
    fontSize: 32,
  },
  description: {paddingTop: 4},
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default ListItem;
