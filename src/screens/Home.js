import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
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
    setSearchValue('')
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
        searchMovie !== '' ? setData(result.data) : setData({});
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchMovie]);

  console.log(data);

  return (

      <View style={{...styles.mainView, backgroundColor: activeTheme.backgroundColor }}>
        <View style={{...styles.searchBar, color:activeTheme.color}}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {handleSearch()}}
          >
            <Icon name='ios-search' size={30} color={activeTheme.color} />
          </TouchableOpacity>
          <TextInput
            style={{...styles.inputText, color:activeTheme.color}}
            autoCapitalize='none'
            placeholder='Enter movie title'
            placeholderTextColor={activeTheme.color}
            onChangeText={value => setSearchValue(value)}
            value={searchValue}
          />
        </View>

        {error && <Text>Ups... Something didn't go according to the plan :(</Text>}

        {data.Error && <Text style={{...styles.mainText, color: activeTheme.color}}>
          Sorry - no such movie (or wrong title)
        </Text>}

        {(searchMovie === '') ? null
        :
          loading ?
            (
              <Text style={{...styles.mainText, color: activeTheme.color}}>Searching...</Text>
            )
          :
          data.Title &&
          (
            <ScrollView contentContainerStyle={styles.movieDetails}>
              {/* <Text style={{...styles.title, color: activeTheme.color}}>{data.Title}</Text> */}
              <Image
                style={styles.poster}
                source={{uri: data.Poster}}
                resizeMode="contain"
              />
              <View style={styles.stats}>
                <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>Duration:{'\n'} {data.Runtime}</Text>
                <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>Genre:{'\n'} {data.Genre}</Text>
              </View>
              {data.Ratings && <View style={styles.ratingsWrapper}>
                <Text>Ratings:{'\n'}</Text>
                {data.Ratings.map(e => {
                  return <Text key={e.Source} style={{...styles.movieRating, color: activeTheme.color}}>{e.Source + ': ' + e.Value}</Text>
                })}
              </View>}
              <Text style={{...styles.mainText, color: activeTheme.color}}>Director: {data.Director}</Text>
              <Text style={{...styles.mainText, color: activeTheme.color}}>Main cast:{'\n'}{data.Actors}</Text>
              <Text style={{...styles.moviePlot, color: activeTheme.color}}>Plot:{'\n'}
                {data.Plot}
              </Text>
            </ScrollView>
          )
        }
      </View>

  )
}

export const StyledHome = withTheme(Home);

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainText: {
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 20
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    height: 40,
    width: '90%',
    paddingLeft: 20,
  },
  searchButton: {
    height: 40,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  movieDetails: {
    padding: 20,
    justifyContent: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 35,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  ratingsWrapper: {
    marginTop: 15,
    marginBottom: 15
  },
  movieRating: {
    fontSize: 20,
    lineHeight: 25,
  },
  moviePlot: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'justify'
  },
  poster: {
    height: 500,
    width: '100%',
    alignSelf: 'center'
  },
  stats: {
    flexDirection: 'row',
  }
});
