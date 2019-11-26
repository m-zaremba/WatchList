import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ThemeProvider, withTheme } from './src/contexts/ThemeContext';
import { StyledHome } from './src/screens/Home';
import { StyledList } from './src/screens/List';
import { Settings } from './src/screens/Settings';
import { StyledTabBar } from './src/components/TabBar';

const TabNavigator = createBottomTabNavigator(
  {
    Home: StyledHome,
    List: StyledList,
    Settings: Settings,
  },
  {
    tabBarComponent: props => <StyledTabBar {...props} />,
  }
);

const App = createAppContainer(TabNavigator);

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
