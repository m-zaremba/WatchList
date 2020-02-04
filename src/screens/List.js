import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { MoviesListContext } from "../contexts/MovieListContext";
import { posterPlaceholder } from "./Home";
import Icon from "react-native-vector-icons/Ionicons";

const List = ({ activeTheme }) => {
  const { storedList, setMovieToRemove } = useContext(MoviesListContext);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          ...styles.listElement,
          backgroundColor: activeTheme.movieListElementBackground
        }}
      >
        <Image
          style={styles.listElementPoster}
          source={{
            uri: item.Poster === "N/A" ? posterPlaceholder : item.Poster
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            ...styles.listElementText,
            color: activeTheme.movieListFontColor
          }}
        >
          {item.Title} ({item.Year})
        </Text>
        <Icon
          name="ios-checkmark-circle"
          size={35}
          color={activeTheme.modalFontColor}
          style={{ position: "absolute", right: 5 }}
          onPress={() => setMovieToRemove(item)}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.listView,
        backgroundColor: activeTheme.backgroundColor
      }}
    >
      <View style={styles.listWrapper}>
        <FlatList
          data={storedList}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
        />
      </View>
    </View>
  );
};

List.propTypes = {
  activeTheme: PropTypes.object,
  item: PropTypes.object
};

export const StyledList = withTheme(List);

const styles = StyleSheet.create({
  listView: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listWrapper: {
    width: "100%"
  },
  listElementText: {
    fontSize: 25,
    paddingLeft: 10,
    maxWidth: "60%"
  },
  listElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10
  },
  listElementPoster: {
    minHeight: 80,
    width: 60
  }
});
