import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Home } from './src/Home';

const App = () => {

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;
