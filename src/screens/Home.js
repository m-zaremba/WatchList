import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ThemeContext, activeTheme, withTheme } from '../contexts/ThemeContext';
import { themes, testThemes } from '../themes/themes';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';



const Home = ({themes, activeTheme}) => {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shortPlot, setShortPlot] = useState(true);

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


  return (

      <View style={{...styles.mainView, backgroundColor: activeTheme.backgroundColor }}>
        <View style={{...styles.searchBar, color:activeTheme.color}}>
          <TextInput
            style={{...styles.inputText, color:activeTheme.color}}
            autoCapitalize='none'
            placeholder='Enter movie title'
            placeholderTextColor={activeTheme.color}
            onChangeText={value => setSearchValue(value)}
            value={searchValue}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {handleSearch()}}
          >
            <Icon name='ios-search' size={30} color={activeTheme.color} />
          </TouchableOpacity>
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
                <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>
                  Duration:{'\n'}
                  <Text style={styles.statsText}>{data.Runtime}</Text>
                </Text>
                <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>
                  Genre:{'\n'}
                  <Text style={styles.statsText}>{data.Genre}</Text>
                </Text>
                <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>
                  Language:{'\n'}
                  <Text style={styles.statsText}>{data.Language}</Text>
                </Text>
              </View>
              {data.Ratings && <View style={styles.ratingsWrapper}>
                <Text style={{...styles.mainText, color: activeTheme.color, marginBottom: 0}}>Ratings</Text>
                {data.Ratings.map(e => {
                  return <Text key={e.Source} style={{...styles.movieRating, color: activeTheme.color}}>{e.Source + ': ' + e.Value}</Text>
                })}
              </View>}
              <Text style={{...styles.mainText, color: activeTheme.color}}>
                Director{'\n'}
                <Text style={{fontWeight: 'normal'}}>{data.Director}</Text>
              </Text>
              <Text style={{...styles.mainText, color: activeTheme.color}}>
                Main cast{'\n'}
                <Text style={{fontWeight: 'normal'}}>{data.Actors}</Text></Text>
              {shortPlot ? (
                <>
                  <Text
                    style={{...styles.moviePlot, color: activeTheme.color}}
                    numberOfLines={4}
                  >
                    Plot{'\n'}
                    <Text style={{fontWeight: 'normal'}}>{data.Plot}</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.showPlotBtn}
                    onPress={() => setShortPlot(false)}
                  >
                    <Text style={{color: activeTheme.color}}>Read more</Text>
                  </TouchableOpacity>
                </>
              )
              :
              <>
                <Text
                  style={{...styles.moviePlot, color: activeTheme.color}}
                >
                  Plot:{'\n'}
                  <Text style={{fontWeight: 'normal'}}>{data.Plot}</Text>
                </Text>
                <TouchableOpacity
                  style={styles.showPlotBtn}
                  onPress={() => setShortPlot(true)}
                >
                  <Text style={{color: activeTheme.color}}>Hide</Text>
                </TouchableOpacity>
              </>
              }
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
    fontWeight: 'bold',
    marginBottom: 40
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
    marginBottom: 40
  },
  movieRating: {
    fontSize: 16,
  },
  moviePlot: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  poster: {
    height: 400,
    width: '70%',
    alignSelf: 'center'
  },
  stats: {
    flexDirection: 'row',
    marginTop: 40,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'normal'
  },
  showPlotBtn: {
    alignItems: 'flex-end'
  }
});
