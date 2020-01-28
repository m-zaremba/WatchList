import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyledHome } from '../screens/Home';
import { StyledList } from '../screens/List';
import { StyledSettings } from '../screens/Settings';
import { StyledTabBar } from '../components/TabBar';
import Icon from 'react-native-vector-icons/Ionicons';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: StyledHome,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name='ios-search' size={30} color={tintColor} />
      }

    },
    List: {
      screen: StyledList,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name='md-paper' size={30} color={tintColor} />
      }
    },
    Settings: {
      screen: StyledSettings,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name='ios-color-palette' size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarComponent: props => <StyledTabBar {...props} />
  }
)


export const Navigator = createAppContainer(TabNavigator);
