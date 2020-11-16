import './App.css';
import React from "react";

import HeaderBar from "./components/app-bar";
import Build from "./pages/build";

import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <HeaderBar appName="League App" />
      <Build />
    </ThemeProvider>
  );
}

export default App;
