import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  TouchableHighlight
} from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import { StyledSearchbar } from "../components/Searchbar";
import { StyledMovieDetails } from "../components/MovieDetails";
import axios from "axios";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { MoviesListContext } from "../contexts/MovieListContext";

export const posterPlaceholder =
  "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg";

const Home = ({ activeTheme }) => {
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchMovie, setSearchMovie] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const { setMovieToAdd } = useContext(MoviesListContext);

  const resetInputField = () => {
    setSearchValue("");
  };

  const handleSearch = () => {
    setSearchMovie(searchValue);
    resetInputField();
  };

  useEffect(() => {
    const fetchMovieList = async () => {
      setListError(false);
      setListLoading(true);

      try {
        const result = await axios(
          `http://www.omdbapi.com/?s=${searchMovie}&plot=full&apikey=f1c551f9&?`
        );
        searchMovie !== ""
          ? setMovieList(result.data.Search)
          : setMovieList([]);
      } catch (error) {
        setListError(true);
      }
      setListLoading(false);
    };
    fetchMovieList();
  }, [searchMovie]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setModalError(false);
      setModalLoading(true);

      try {
        const result = await axios(
          `http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=f1c551f9&?`
        );
        movieId !== "" ? setMovieDetails(result.data) : setMovieDetails({});
      } catch (error) {
        setModalError(true);
      }
      setModalLoading(false);
    };
    fetchMovieDetails();
  }, [movieId]);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={{
        ...styles.listItemWrapper,
        backgroundColor: activeTheme.searchItemBackgroundColor
      }}
      onPress={() => {
        setModalVisible(true) || setMovieId(item.imdbID);
      }}
    >
      <>
        <View style={styles.listItem}>
          <Image
            style={styles.listPoster}
            source={{
              uri: item.Poster === "N/A" ? posterPlaceholder : item.Poster
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              ...styles.listItemText,
              color: activeTheme.modalFontColor
            }}
          >
            {item.Title}
          </Text>
          <Text style={{ color: activeTheme.modalFontColor }}>
            ({item.Year})
          </Text>
        </View>
        <Icon
          name="ios-add-circle"
          size={35}
          color={activeTheme.modalFontColor}
          style={{ position: "absolute", bottom: 0, right: 5 }}
          onPress={() => setMovieToAdd(item)}
        />
      </>
    </TouchableHighlight>
  );

  return (
    <View
      style={{
        ...styles.mainView,
        backgroundColor: activeTheme.backgroundColor
      }}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            ...styles.modal,
            backgroundColor: activeTheme.modalBackground
          }}
        >
          <StyledMovieDetails
            movieDetails={movieDetails}
            modalLoading={modalLoading}
            modalError={modalError}
          />
          <Icon
            name="ios-close"
            size={60}
            color={activeTheme.modalFontColor}
            style={{ position: "absolute", top: -5, right: 15 }}
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
      <StyledSearchbar
        handleSearch={handleSearch}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {listError && (
        <Text>{"Ups... Something didn't go according to the plan :("}</Text>
      )}
      {movieList === undefined && (
        <Text style={{ ...styles.mainText, color: activeTheme.color }}>
          Sorry - no such movie (or wrong title)
        </Text>
      )}
      {listLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={activeTheme.color} />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={movieList}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={item => item.imdbID}
          />
        </View>
      )}
    </View>
  );
};

Home.propTypes = {
  activeTheme: PropTypes.object,
  item: PropTypes.object
};

export const StyledHome = withTheme(Home);

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  mainText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    marginBottom: 40
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  listItemWrapper: {
    maxWidth: "45%",
    flex: 0.5,
    margin: 10,
    padding: 15
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  listPoster: {
    height: 200,
    minWidth: "90%"
  },
  listItemText: {
    textAlign: "center"
  },
  modal: {
    margin: 10,
    borderRadius: 5,
    flex: 1
  }
});
