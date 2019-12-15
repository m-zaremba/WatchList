import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { activeTheme, withTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = props => {

  return (
    <BottomTabBar
      {...props}
      activeTintColor={props.activeTheme.color}
      labelStyle={style.label}
      style={{backgroundColor: props.activeTheme.backgroundColor}}
    />
  );
};

export const StyledTabBar = withTheme(TabBar);

const style = StyleSheet.create({
  label: {
    display: 'none'
  },
});
