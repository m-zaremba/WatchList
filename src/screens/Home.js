import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ThemeContext, activeTheme, withTheme } from '../contexts/ThemeContext';
import { themes, testThemes } from '../themes/themes';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Home = ({themes, activeTheme}) => {
  const { colors, setColors, toggleTheme } = useContext(ThemeContext);
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const resetInputField = () => {
    setSearchValue("")
  }

  const handleSearch = () => {
    setSearchMovie(searchValue);
    resetInputField();
  }

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await axios(
        `http://www.omdbapi.com/?t=${searchMovie}&plot=full&apikey=f1c551f9&?`,
        );
        setData(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchMovie]);


  return (

      <View style={{...styles.mainView, backgroundColor: activeTheme.backgroundColor }}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            onPress={() => {handleSearch()}}
          >
            <Icon name='ios-search' size={30} color='red' />
          </TouchableOpacity>
          <TextInput
            style={styles.inputText}
            autoCapitalize='none'
            placeholder='Enter movie title'
            onChangeText={value => setSearchValue(value)}
            value={searchValue}
          />
        </View>


        {error && <Text>Ups... Something didn't go according to the plan :(</Text>}

        {(searchMovie === '') ? null : loading ? (
          <Text style={{...styles.mainText, color: activeTheme.color}}>Searching...</Text>
        ) : data.Title ? (
          <Text style={{...styles.mainText, color: activeTheme.color}}>
            {data.Plot}
          </Text>
        ) : <Text style={{...styles.mainText, color: activeTheme.color}}>Sorry - no such movie (or wrong title)</Text>}
      </View>

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
    fontSize: 20,
  },
  searchBar: {
    paddingTop: 25,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row'
  },
  inputText: {
    color: 'black',
    height: 40,
    width: '70%',
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(245, 71, 71)'
  }
});
