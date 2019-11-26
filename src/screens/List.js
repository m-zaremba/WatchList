import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const List = () => {

  return (
    <View style={style.listView}>
      <Text style={style.listText}>List Screen</Text>
    </View>
  )
};

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
