import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { allThemes, withTheme } from "../contexts/ThemeContext";
import { MoviesListContext } from "../contexts/MovieListContext";
import PropTypes from "prop-types";

const Settings = ({ activeTheme, setTheme, navigation, }) => {
  const { clearMovieList } = useContext(MoviesListContext)
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setTheme(item.key) || navigation.navigate("Home")}
    >
      <View
        style={{
          ...style.itemContainer,
          backgroundColor: item.backgroundColor
        }}
      >
        <Text style={{ ...style.itemText, color: item.color }}>{item.key}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <FlatList
      style={{
        ...style.container,
        backgroundColor: activeTheme.backgroundColor
      }}
      ListHeaderComponent={
        <Text style={{ ...style.headline, color: activeTheme.color }}>
          Choose your theme:
        </Text>
      }
      data={allThemes}
      renderItem={renderItem}
    />
    <TouchableOpacity
      
      onPress={() => {
        clearMovieList();
      }}
    >
      <Text style={{color: 'red'}}>
        Clear list
      </Text>
    </TouchableOpacity>
    </>
  );
};

Settings.propTypes = {
  activeTheme: PropTypes.object,
  setTheme: PropTypes.func,
  item: PropTypes.object
};

export const StyledSettings = withTheme(Settings);

const style = StyleSheet.create({
  container: { flex: 1 },
  headline: {
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
    fontWeight: "200",
    fontSize: 24
  },
  itemContainer: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    marginTop: 5
  },
  itemText: { fontWeight: "bold" }
});
