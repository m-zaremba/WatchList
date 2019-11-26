import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

import { defaultTheme } from '../contexts/ThemeContext'

export const TabBar = props => {
  return (
    <BottomTabBar
      {...props}
      activeTintColor={defaultTheme.color}
      labelStyle={style.label}
    />
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 22,
    fontWeight: '400',
    paddingBottom: 8,
  },
});
