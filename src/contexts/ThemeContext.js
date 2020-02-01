import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../themes/themes';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from "prop-types";

export const defaultTheme = themes[0];
export const allThemes = themes;
const STORAGE_KEY = 'THEME_ID';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeID, setThemeID] = useState();

  useEffect(() => {
    (async () => {
      const storedThemeID = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedThemeID) setThemeID(storedThemeID);
      else setThemeID(defaultTheme.key);
    })();
  }, []);


  return (
    <ThemeContext.Provider value={{themeID, setThemeID}}>
      {themeID ? children : null}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}

export function withTheme(Component) {
  // eslint-disable-next-line react/display-name
  return props => {
    const { themeID, setThemeID } = useContext(ThemeContext);
    const getTheme = themeID => themes.find(theme => theme.key === themeID);
    const setTheme = themeID => {
      AsyncStorage.setItem(STORAGE_KEY, themeID);
      setThemeID(themeID);
    };

    return <Component {...props} themes={allThemes} activeTheme={getTheme(themeID)} setTheme={setTheme}/>;
  };
}
