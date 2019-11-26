import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

import { defaultTheme, withTheme } from '../contexts/ThemeContext'

const TabBar = props => {
  return (
    <BottomTabBar
      {...props}
      activeTintColor={props.defaultTheme.color}
      labelStyle={style.label}
    />
  );
};

export const StyledTabBar = withTheme(TabBar);

const style = StyleSheet.create({
  label: {
    fontSize: 22,
    fontWeight: '400',
    paddingBottom: 8,
  },
});
