import React, { createContext, useState, useMemo } from 'react';
import { themes, testThemes } from '../themes/themes';

export const defaultTheme = testThemes[0];
export const allThemes = testThemes;
export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const [colors, setColors] = useState(themes.lightTheme) //setting light theme as default
    const value = useMemo(
      () => ({
          colors,
          setColors,
      }),
      [colors, setColors],
    );

    const toggleTheme = () => {
      if(colors.type === 'light') {
        setColors(themes.darkTheme);
        } else {
        setColors(themes.lightTheme);
        }
    }

  return (
    <ThemeContext.Provider value={{...value, toggleTheme}}>{children}</ThemeContext.Provider>
  );
}
