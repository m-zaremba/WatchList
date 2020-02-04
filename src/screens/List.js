import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { MoviesListContext } from "../contexts/MovieListContext";

const List = ({ activeTheme }) => {
  const { storedList } = useContext(MoviesListContext);

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: "green" }}>
        <Text style={{ color: "red" }}>{item.Title}</Text>
        <Text style={{ color: "red" }}>{item.Year}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        ...style.listView,
        backgroundColor: activeTheme.backgroundColor
      }}
    >
      <FlatList
        data={storedList}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
      />
    </View>
  );
};

List.propTypes = {
  activeTheme: PropTypes.object,
  item: PropTypes.object
};

export const StyledList = withTheme(List);

const style = StyleSheet.create({
  listView: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listText: {
    fontSize: 40,
    fontWeight: "bold"
  }
});
