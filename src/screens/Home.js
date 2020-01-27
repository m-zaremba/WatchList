import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Modal, TouchableHighlight } from 'react-native';
import { activeTheme, withTheme } from '../contexts/ThemeContext';
import { StyledSearchbar } from '../components/Searchbar';
import { StyledSearchItem } from '../components/SearchItem';
import axios from 'axios';

const posterPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg";



const Home = ({ activeTheme }) => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shortPlot, setShortPlot] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.listItem}
      onPress={() => {setModalVisible(true)}}
    >
      <View>
        <Image
          style={{height: 200}}
          source={{uri: item.Poster === 'N/A' ? posterPlaceholder : item.Poster}}
          resizeMode="contain"
        />
        <Text>{item.Title}</Text>
        <Text>Year: {item.Year}</Text>
      </View>
    </TouchableHighlight>
  );

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
        `http://www.omdbapi.com/?s=${searchMovie}&plot=full&apikey=f1c551f9&?`,
        );
        searchMovie !== '' ? setData(result.data.Search) : setData([]);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchMovie]);


  return (
    <View style={{...styles.mainView, backgroundColor: activeTheme.backgroundColor }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
      {
        loading ?
          (
            <View style={styles.spinner}>
              <ActivityIndicator size='large' color={activeTheme.color} />
            </View>
          )
        :
          (
            <View style={styles.container}>
              <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={item => item.imdbID}
              />
            </View>
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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 5,
},
listItem: {
  maxWidth: '45%',
  flex:0.5,
  backgroundColor: 'gray',
  margin: 10,
  padding: 15,
}
});
