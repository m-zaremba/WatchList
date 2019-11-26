import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import { themes, testThemes } from '../themes/themes';

//console.log(testThemes[2]);

export const Home = () => {
  const { colors, setColors, toggleTheme } = useContext(ThemeContext);

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
