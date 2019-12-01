import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { StyledHome } from './src/screens/Home';
import { StyledList } from './src/screens/List';
import { StyledSettings } from './src/screens/Settings';
import { StyledTabBar } from './src/components/TabBar';
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

const App = createAppContainer(TabNavigator);

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
