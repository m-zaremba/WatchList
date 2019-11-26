import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ThemeProvider, ThemeContext, defaultTheme } from '../contexts/ThemeContext';
import { themes, testThemes } from '../themes/themes';


export const Home = () => {
  const { colors, setColors, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <View style={{...styles.mainView, backgroundColor: defaultTheme.backgroundColor }}>
        <Text style={{...styles.mainText, color: defaultTheme.color}}>Hello Native World</Text>
        <Button title='toggle theme' onPress={toggleTheme} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
