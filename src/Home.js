import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { themes } from './themes/themes';

export const Home = () => {
  const { colors, setColors } = useContext(ThemeContext);

  const toggleTheme = () => {
    if(colors.type === 'light') {
      setColors(themes.darkTheme);
      } else {
      setColors(themes.lightTheme);
      }
  }

  return (
    <>
      <View style={{...styles.mainView, backgroundColor: colors.backgroundColor }}>
        <Text style={{...styles.mainText, color: colors.color}}>Hello Native World</Text>
        <Button title='toggle theme' onPress={toggleTheme} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
