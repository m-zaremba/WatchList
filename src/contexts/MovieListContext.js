import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY = "MOVIE_LIST";
export const MoviesListContext = createContext();

export const MoviesListProvider = props => {
  const [storedList, setStoredList] = useState([]);
  const [movieToAdd, setMovieToAdd] = useState({});
  const [movieToRemove, setMovieToRemove] = useState({});

  const fetchData = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMovies) {
        setStoredList(JSON.parse(storedMovies));
      } else {
        setStoredList([]);
      }
    } catch (error) {
      console.log("cannot load stored data");
    }
  };

  const clearMovieList = async () => {
    try {
      let keys = ["MOVIE_LIST"];
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log("Failed to clear the async storage.");
    }
    fetchData();
  };

  const addToList = () => {
    const listToStore = [...storedList, movieToAdd];
    const stringifiedListToStore = JSON.stringify(listToStore);
    AsyncStorage.setItem(STORAGE_KEY, stringifiedListToStore);
    fetchData(); //refresh data
  };

  const removeFromList = () => {
    const unwatchedMovieList = storedList.filter(function(item) {
      return item.imdbID !== movieToRemove.imdbID;
    });
    const stringifiedUnwatchedMovies = JSON.stringify(unwatchedMovieList);
    AsyncStorage.setItem(STORAGE_KEY, stringifiedUnwatchedMovies);
    fetchData();
    console.log(unwatchedMovieList);
  };

  useEffect(() => {
    if (movieToRemove.imdbID !== undefined) {
      removeFromList();
    }
  }, [movieToRemove]);

  useEffect(() => {
    fetchData(); //fetch data after app reload/crash etc.

    if (movieToAdd.Title !== undefined) {
      addToList();
    }
  }, [movieToAdd]);

  return (
    <MoviesListContext.Provider
      value={{ setMovieToAdd, storedList, clearMovieList, setMovieToRemove }}
    >
      {props.children}
    </MoviesListContext.Provider>
  );
};

MoviesListProvider.propTypes = {
  children: PropTypes.node
};
