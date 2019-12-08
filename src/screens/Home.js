import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ThemeContext, activeTheme, withTheme } from '../contexts/ThemeContext';
import { themes, testThemes } from '../themes/themes';
import axios from 'axios';

const Home = ({themes, activeTheme}) => {
  const { colors, setColors, toggleTheme } = useContext(ThemeContext);

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://www.omdbapi.com/?t=the+mask&plot=full&apikey=f1c551f9&?',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <View style={{...styles.mainView, backgroundColor: activeTheme.backgroundColor }}>
        <Text style={{...styles.mainText, color: activeTheme.color}}>Hello Native World</Text>
      </View>
    </>
  )
}

export const StyledHome = withTheme(Home);

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
