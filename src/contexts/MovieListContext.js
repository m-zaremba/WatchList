import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY = "MOVIE_LIST";
export const MoviesListContext = createContext();

export const MoviesListProvider = props => {
  const [storedList, setStoredList] = useState([]);
  const [movieToAdd, setMovieToAdd] = useState({});

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

  const addToList = () => {
    const listToStore = [...storedList, movieToAdd];
    const stringifiedListToStore = JSON.stringify(listToStore);
    AsyncStorage.setItem(STORAGE_KEY, stringifiedListToStore);
    fetchData(); //refresh data 
  };

  useEffect(() => {
    fetchData(); //fetch data after app reload/crash etc.

    if (movieToAdd.Title !== undefined) {
      addToList();
    }
  }, [movieToAdd]);

  return (
    <MoviesListContext.Provider value={{ setMovieToAdd, storedList }}>
      {props.children}
    </MoviesListContext.Provider>
  );
};

MoviesListProvider.propTypes = {
  children: PropTypes.node
};
