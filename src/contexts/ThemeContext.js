import React, { createContext, useContext, useState, useEffect } from 'react';
import { testThemes } from '../themes/themes';
import AsyncStorage from '@react-native-community/async-storage';

//export const activeTheme = testThemes[0];
export const allThemes = testThemes;
const STORAGE_KEY = 'THEME_ID';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeID, setThemeID] = useState();

  useEffect(() => {
    (async () => {
      const storedThemeID = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedThemeID) setThemeID(storedThemeID);
      else setThemeID(activeTheme.key);
    })();
  }, []);


  return (
    <ThemeContext.Provider value={{themeID, setThemeID}}>
      {!!themeID ? children : null}
    </ThemeContext.Provider>
  );
}

export function withTheme(Component) {
  return props => {
    const { themeID, setThemeID } = useContext(ThemeContext);
    const getTheme = themeID => testThemes.find(theme => theme.key === themeID);
    const setTheme = themeID => {
      AsyncStorage.setItem(STORAGE_KEY, themeID);
      setThemeID(themeID);
    };

    return <Component {...props} themes={allThemes} activeTheme={getTheme(themeID)} setTheme={setTheme}/>;
  };
}
