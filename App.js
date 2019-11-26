import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Home } from './src/screens/Home';
import { List } from './src/screens/List';
import { Settings } from './src/screens/Settings';

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  List: List,
  Settings: Settings,
});

const App = createAppContainer(TabNavigator);

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
