import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import React from "react";

import Build from "./pages/build";
import Home from "./pages/home";

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
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">League App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/builds">Builds</Nav.Link>
              <Nav.Link href="#pricing">Counters</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/builds" component={Build} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
