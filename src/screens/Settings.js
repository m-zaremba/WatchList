import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';
import { activeTheme, allThemes, withTheme } from '../contexts/ThemeContext';


const Settings = ({ themes, activeTheme, setTheme, navigation }) => {

  renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => setTheme(item.key) || navigation.navigate('Home')}>
        <View
          style={{ ...style.itemContainer, backgroundColor: item.backgroundColor }}>
          <Text style={{ ...style.itemText, color: item.color }}>{item.key}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        style={{...style.container, backgroundColor: activeTheme.backgroundColor}}
        ListHeaderComponent={
          <Text style={{...style.headline, color: activeTheme.color }}>
            Choose your theme:
          </Text>
        }
        data={allThemes}
        renderItem={renderItem}
      />
    );
  };

  export const StyledSettings = withTheme(Settings);

  const style = StyleSheet.create({
    container: { flex: 1 },
    headline: {
      marginTop: 60,
      marginBottom: 20,
      marginLeft: 20,
      fontWeight: '200',
      fontSize: 24,
    },
    itemContainer: {
      height: 70,
      justifyContent: 'center',
      paddingLeft: 20,
      marginTop: 5,
    },
    itemText: { fontWeight: 'bold' },
  });
