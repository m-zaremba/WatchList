import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { MoviesListContext } from "../contexts/MovieListContext";
import { posterPlaceholder } from "./Home";
import Icon from "react-native-vector-icons/Ionicons";

const List = ({ activeTheme }) => {
  const { storedList, setWatchedMovie, setMovieToRemove } = useContext(MoviesListContext);
  const [watched, setWatched] = useState(false);

  const renderItem = ({ item }) => {
    return (
      item.watched === watched && (
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
          <TouchableOpacity
            style={{ position: "absolute", right: 20 }}
            onPress={() =>
              watched ? setMovieToRemove(item) : setWatchedMovie(item)
            }
          >
            <Icon
              name={!watched ? "md-checkmark" : "md-trash"}
              size={40}
              color={activeTheme.modalFontColor}
            />
          </TouchableOpacity>
        </View>
      )
    );
  };

  return (
    <View
      style={{
        ...styles.listView,
        backgroundColor: activeTheme.backgroundColor
      }}
    >
      <View
        style={{ ...styles.listButtonWrapper, borderColor: activeTheme.color }}
      >
        <TouchableOpacity
          style={{
            ...styles.listButton,
            backgroundColor: !watched
              ? activeTheme.color
              : activeTheme.backgroundColor
          }}
          onPress={() => {
            setWatched(false);
          }}
        >
          <Text
            style={{
              ...styles.listButtonText,
              color: !watched ? activeTheme.backgroundColor : activeTheme.color
            }}
          >
            To watch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.listButton,
            backgroundColor: watched
              ? activeTheme.color
              : activeTheme.backgroundColor
          }}
          onPress={() => {
            setWatched(true);
          }}
        >
          <Text
            style={{
              ...styles.listButtonText,
              color: watched ? activeTheme.backgroundColor : activeTheme.color
            }}
          >
            Watched
          </Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "flex-start"
  },
  listWrapper: {
    width: "100%",
    marginTop: 10
  },
  listElementText: {
    fontSize: 20,
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
  },
  listButtonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    width: "50%"
  },
  listButton: {
    padding: 10,
    width: "50%"
  },
  listButtonText: {
    textAlign: "center"
  }
});
