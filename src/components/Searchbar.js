import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { activeTheme, withTheme, ThemeContext } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const Searchbar = ({ handleSearch, searchValue, setSearchValue, activeTheme }) => {

  return (
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
  )
};

export const StyledSearchbar = withTheme(Searchbar);

const styles = StyleSheet.create({
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
});
