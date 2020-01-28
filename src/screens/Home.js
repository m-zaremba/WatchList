import React, { useState, useEffect } from "react";
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

const posterPlaceholder =
  "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg";

const Home = ({ activeTheme }) => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchMovie, setSearchMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [movieDetails, setMovieDetails] = useState({});

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
      <View style={styles.listItem}>
        <Image
          style={styles.listPoster}
          source={{
            uri: item.Poster === "N/A" ? posterPlaceholder : item.Poster
          }}
          resizeMode="contain"
        />
        <Text style={styles.listItemText}>{item.Title}</Text>
        <Text>Year: {item.Year}</Text>
      </View>
    </TouchableHighlight>
  );

  const resetInputField = () => {
    setSearchValue("");
  };

  const handleSearch = () => {
    setSearchMovie(searchValue);
    resetInputField();
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await axios(
          `http://www.omdbapi.com/?s=${searchMovie}&plot=full&apikey=f1c551f9&?`
        );
        searchMovie !== "" ? setData(result.data.Search) : setData([]);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchMovie]);

  useEffect(() => {
    const fetchDetails = async () => {
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
    fetchDetails();
  }, [movieId]);

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
      {error && (
        <Text>Ups... Something didn`&quot;`t go according to the plan :(</Text>
      )}
      {data === undefined && (
        <Text style={{ ...styles.mainText, color: activeTheme.color }}>
          Sorry - no such movie (or wrong title)
        </Text>
      )}
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={activeTheme.color} />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={data}
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
    padding: 15,
    borderTopLeftRadius: 20
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  listPoster: {
    height: 200,
    minWidth: "90%",
    borderTopLeftRadius: 10
  },
  listItemText: {
    textAlign: "center"
  },
  modal: {
    margin: 10,
    borderRadius: 5
  }
});
