import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Navigator } from './src/navigation';

export default App = () => (
  <ThemeProvider>
    <Navigator />
  </ThemeProvider>
);
