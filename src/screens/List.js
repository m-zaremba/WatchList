import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTheme } from '../contexts/ThemeContext';

const List = ({ activeTheme, themes }) => {

  return (
    <View style={{...style.listView, backgroundColor: activeTheme.backgroundColor}}>
      <Text style={{...style.listText, color:activeTheme.color}}>List Screen</Text>
    </View>
  )
};

export const StyledList = withTheme(List);

const style = StyleSheet.create({
  listView: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
