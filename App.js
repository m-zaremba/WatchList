import React from "react";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { Navigator } from "./src/navigation";
import { MoviesListProvider } from "./src/contexts/MovieListContext";

const App = () => (
  <ThemeProvider>
    <MoviesListProvider>
      <Navigator />
    </MoviesListProvider>
  </ThemeProvider>
);

export default App;
