import React from "react";

import SideNav from "../components/sidebar";
import ChampionDisplay from "../components/champion-display";
import {
  getChampionInfo
} from "../api";

import "../style/build-page.css";

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentChampion: "",
          championIndex: null,
          championBuild: null
        }
    }

    async handleNameChange(newName) {
        let serverChampNames = require("../assets/clean_champ_names.json");
        let humanReadableNames = require("../assets/human_readable_names.json");
        let index = humanReadableNames.indexOf(newName);
        let res = await getChampionInfo(serverChampNames[index]);
        if(res.status === 200) {
          this.setState({
            currentChampion: newName,
            championIndex: index,
            championBuild: res.data
          });
        }
        else {
          console.log("Request failed, need to put a toast or something here");
        }
    }

    render() {
        return (
          <div className="build-page">
            <SideNav nameChange={this.handleNameChange.bind(this)} />
            <ChampionDisplay 
              champName={this.state.currentChampion}
              build={this.state.championBuild}
            />
          </div>
        );
    }
}

export default Build;