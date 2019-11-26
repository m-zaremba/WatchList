import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTheme } from '../contexts/ThemeContext';

const List = ({ defaultTheme, allThemes }) => {

  return (
    <View style={{...style.listView, backgroundColor: defaultTheme.backgroundColor}}>
      <Text style={style.listText}>List Screen</Text>
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
