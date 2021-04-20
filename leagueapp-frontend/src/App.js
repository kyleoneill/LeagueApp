import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import React from "react";

import Build from "./pages/build";
import Home from "./pages/home";
import Counter from "./pages/counter";

import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import {Navbar, Nav} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

import {
  Switch,
  Route,
  HashRouter
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
      <HashRouter>
        <div className={classes.backgroundContainer}>
          <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand>League App</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/builds">
                <Nav.Link>Builds</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/counters">
                <Nav.Link>Counters</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/builds" component={Build} />
            <Route path="/counters" component={Counter} />
          </Switch>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
