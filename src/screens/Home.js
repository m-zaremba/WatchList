import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext, activeTheme, withTheme } from '../contexts/ThemeContext';
import { StyledSearchbar } from '../components/Searchbar';
import { StyledSearchItem } from '../components/SearchItem';
import axios from 'axios';



const Home = ({ activeTheme }) => {
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
      <StyledSearchbar
        handleSearch={handleSearch}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {
        error &&
        <Text>
          Ups... Something didn't go according to the plan :(
        </Text>
      }
      {
        data.Error &&
        <Text style={{...styles.mainText, color: activeTheme.color}}>
          Sorry - no such movie (or wrong title)
        </Text>
      }
      <StyledSearchItem
        loading={loading}
        data={data}
        searchMovie={searchMovie}
        shortPlot={shortPlot}
        setShortPlot={setShortPlot}
      />
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
  }
});
