import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY = "MOVIE_LIST";
export const MoviesListContext = createContext();

export const MoviesListProvider = props => {
  const [storedList, setStoredList] = useState([]);
  const [movieToAdd, setMovieToAdd] = useState({});
  const [movieToRemove, setMovieToRemove] = useState({});
  const [watchedMovie, setWatchedMovie] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMovies) {
        setStoredList(JSON.parse(storedMovies));
      } else {
        setStoredList([]);
      }
    } catch (error) {
      setAlertMessage("Cannot load the movie list");
      setShowAlert(true);
    }
  };

  const clearMovieList = async () => {
    try {
      let keys = ["MOVIE_LIST"];
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      setAlertMessage("Failed to clear the movie list.");
      setShowAlert(true);
    }
    fetchData();
  };

  const addToList = () => {
    if (storedList.some(e => e.imdbID === movieToAdd.imdbID)) {
      setAlertMessage(`Movie '${movieToAdd.Title}' is already on your list`);
      setShowAlert(true);
    } else {
      const unwatchedMovie = movieToAdd;
      unwatchedMovie.watched = false; //add new key: value pair to new movie object
      const listToStore = [...storedList, unwatchedMovie];
      const stringifiedListToStore = JSON.stringify(listToStore);
      AsyncStorage.setItem(STORAGE_KEY, stringifiedListToStore);
      fetchData();
      setMovieToAdd({});
    }
  };

  const addToWatchedMovies = () => {
    const updatedMovieList = storedList.map(item => {
      if (item.imdbID === watchedMovie.imdbID) {
        return { ...item, watched: true };
      } else {
        return item;
      }
    });
    const stringifiedUpdatedList = JSON.stringify(updatedMovieList);

    AsyncStorage.setItem(STORAGE_KEY, stringifiedUpdatedList);
    fetchData();
  };

  const removeFromList = () => {
    const unwatchedMovieList = storedList.filter(item => {
      return item.imdbID !== movieToRemove.imdbID;
    });
    const stringifiedUnwatchedMovies = JSON.stringify(unwatchedMovieList);
    AsyncStorage.setItem(STORAGE_KEY, stringifiedUnwatchedMovies);
    fetchData();
  };

  useEffect(() => {
    if (movieToRemove.imdbID !== undefined) {
      removeFromList();
    }
  }, [movieToRemove]);

  useEffect(() => {
    if (watchedMovie.imdbID !== undefined) {
      addToWatchedMovies();
    }
  }, [watchedMovie]);

  useEffect(() => {
    fetchData();

    if (movieToAdd.Title !== undefined) {
      addToList();
    }
  }, [movieToAdd]);

  return (
    <MoviesListContext.Provider
      value={{
        setMovieToAdd,
        storedList,
        clearMovieList,
        setWatchedMovie,
        setMovieToRemove,
        alertMessage,
        setAlertMessage,
        showAlert,
        setShowAlert
      }}
    >
      {props.children}
    </MoviesListContext.Provider>
  );
};

MoviesListProvider.propTypes = {
  children: PropTypes.node
};
