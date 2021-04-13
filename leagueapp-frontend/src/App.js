import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import React from "react";

import Build from "./pages/build";
import Home from "./pages/home";
import Counter from "./pages/counter";

import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import {Navbar, Nav} from "react-bootstrap";

import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
    background: darkTheme.palette.background.default,
    color: darkTheme.palette.text.primary,
    display: "flex",
    flexFlow: "column",
    height: "100vh"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className={classes.backgroundContainer}>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">League App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/builds">Builds</Nav.Link>
              <Nav.Link href="/counters">Counters</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/builds" component={Build} />
            <Route path="/counters" component={Counter} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
