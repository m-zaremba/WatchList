import React, { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const MoviesListContext = createContext();

export const MoviesListProvider = (props) => {

  const [movieToAdd, setMovieToAdd] = useState({});

  console.log(movieToAdd);
  


  return (
    <MoviesListContext.Provider value={{setMovieToAdd, movieToAdd}}>
      {props.children}
    </MoviesListContext.Provider>
  );
}

MoviesListProvider.propTypes = {
    children: PropTypes.node
  }