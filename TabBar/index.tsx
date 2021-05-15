import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import MostStarredRepos from '../MostStarredRepos';
import Favourites from '../Favourites';

enum Tabs {
  Home = 'Home',
  Favourites = 'Favourites',
}

const Tab = createBottomTabNavigator();

const TabBar: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Tabs.Home}
        tabBarOptions={{
          activeTintColor: '#735dec',
        }}>
        <Tab.Screen
          name={Tabs.Home}
          component={MostStarredRepos}
          options={{
            tabBarLabel: Tabs.Home,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={Tabs.Favourites}
          component={Favourites}
          options={{
            tabBarLabel: Tabs.Favourites,
            tabBarIcon: ({color, size}) => (
              <Icon name="heart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBar;
