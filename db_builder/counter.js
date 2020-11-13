const { Counter } = require("./database");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const utilityLib = require("./utility");

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

function nameToHumanReadable(str) {
    let name = str.replace(/-/g, ' ');
    name = toTitleCase(name);
    return name;
}

function getNamesFromBox(box) {
    let anchors = box.querySelectorAll("a");
    let names = "";
    for(let i in anchors) {
        let link = anchors[i].querySelector("img").src;
        let split = link.split("/");
        let name = split[split.length - 1];
        name = name.slice(0, -4);
        name = nameToHumanReadable(name);
        names += (name + "&");
        if(i >= 10) {
            break;
        }
    }
    return names.slice(0, -1);
}

async function populateCounters(champions) {
    let failedChampions = []
    for(let i in champions) {
        try {
            let url = `https://www.counterstats.net/league-of-legends/${champions[i]}`;
            let res = await utilityLib.httpsRequest(url);
            let dom = new JSDOM(res);
            let boxes = dom.window.document.querySelectorAll("div.champ-box.ALL");
            let bestPicksAgainst = getNamesFromBox(boxes[0]);
            let worstPicksAgainst = getNamesFromBox(boxes[1]);
            await Counter.create({
                champion: champions[i],
                strongAgainst: bestPicksAgainst,
                weakAgainst: worstPicksAgainst
            });
        }
        catch(e) {
            console.error(`Counter Error: ${e}`);
            failedChampions.push(champions[i]);
        }
        console.log(`Progress: ${parseInt(i) + 1}/${champions.length}: ${champions[i]}`);
        await utilityLib.sleep(150);
    }
    return failedChampions;
}

module.exports = {
    populateCounters
}