import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from "@material-ui/core";
import SearchBar from "./searchbar";
import React, { useState } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  }
}));

export default function SideDrawer(props) {
    const classes = useStyles();
    let championNames = require("../assets/human_readable_names.json")

    //searchbar stuff
    const [input, setInput] = useState('');
    const [championList, setChampionList] = useState();
    const updateInput = async (input) => {
        const filtered = championNames.filter(champion => {
         return champion.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setChampionList(filtered);
    }

    return (
        <Drawer 
            anchor="left"
            variant="permanent"
            className={classes.drawer}
            classes={{paper: classes.drawerPaper}}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <SearchBar
                    keyword={input}
                    setKeyword={updateInput}
                />
                <List>
                    {championList !== undefined && championList.length > 0 &&
                        <>
                            {championList.slice(0, 20).map((text, index) => (
                                <ListItem button key={text} onClick={() => props.nameChange(text, index)}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </>
                    }
                    {(championList === undefined || championList.length === championNames.length) &&
                        <>
                            {championNames.map((text, index) => (
                                <ListItem button key={text} onClick={() => props.nameChange(text, index)}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </>
                    }
                </List>
            </div>
        </Drawer>
    )
}