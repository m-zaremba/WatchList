import React, { createContext, useContext } from 'react';
import { themes, testThemes } from '../themes/themes';

export const defaultTheme = testThemes[0];
export const allThemes = testThemes;

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {


  return (
    <ThemeContext.Provider value={{themes: allThemes, defaultTheme: defaultTheme}}>{children}</ThemeContext.Provider>
  );
}

export function withTheme(Component) {
  return props => {
    const { allThemes, defaultTheme } = useContext(ThemeContext);
    return <Component {...props} themes={allThemes} defaultTheme={defaultTheme} />;
  };
}
