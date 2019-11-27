import React, { createContext, useContext, useState } from 'react';
import { themes, testThemes } from '../themes/themes';

export const defaultTheme = testThemes[0];
export const allThemes = testThemes;

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeID, setThemeID] = useState(defaultTheme.key); //set light theme as default


  return (
    <ThemeContext.Provider value={{themeID, setThemeID}}>{children}</ThemeContext.Provider>
  );
}

export function withTheme(Component) {
  return props => {
    const { themeID, setThemeID } = useContext(ThemeContext);
    const getTheme = themeID => testThemes.find(theme => theme.key === themeID);
    const setTheme = themeID => setThemeID(themeID);

    return <Component {...props} themes={allThemes} defaultTheme={getTheme(themeID)} setTheme={setTheme}/>;
  };
}
