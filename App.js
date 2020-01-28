import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Navigator } from './src/navigation';

const App = () => (
  <ThemeProvider>
    <Navigator />
  </ThemeProvider>
);

export default App;
