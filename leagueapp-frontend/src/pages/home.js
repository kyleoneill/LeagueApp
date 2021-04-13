import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import "../style/build-page.css";

const useStyles = makeStyles((theme) => ({
    homePage: {
        margin: "40px"
    }
}));

export default function Home(props) {
    const classes = useStyles();
    return (
        <div className={classes.homePage}>
            <p>Select "Builds" or "Counters" on the navigation bar above.</p>
        </div>
    );
}
