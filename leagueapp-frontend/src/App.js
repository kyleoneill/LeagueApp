import './App.css';
import React from "react";

import HeaderBar from "./components/app-bar";

import Build from "./pages/build";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <HeaderBar appName="League App" />
      <Build />
    </div>
  );
}

export default App;
