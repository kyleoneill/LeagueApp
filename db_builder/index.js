const fs = require("fs");

const counterLib = require("./counter");
const buildLib = require("./build");

function getChampNames() {
    const fileName = "./clean_champ_names.json";
    const champList = require("./champion.json");
    if(fs.existsSync(fileName)) {
        let champions = require(fileName);
        console.log("Champ name file present");
        return champions;
    }
    else {
        let champs = []
        for(let champ in champList.data) {
            champs.push(champ.toLowerCase());
        }
        fs.writeFile(fileName, JSON.stringify(champs, null, 2), function(err) {
            if (err) throw err;
            console.log("Champion name file not found, generated a new one. It needs to be corrected manually")
        })
    }
}

async function main() {
    let champions = getChampNames();

    let failedCounters = await counterLib.populateCounters(champions);
    if(failedCounters.length > 0) {
        console.log(`Counters failures: ${failedCounters.length}`);
        for(let i in failedCounters) {
            console.log(`Counter failure for: ${failedCounters[i]}`);
        }
    }

    // let failedBuilds = await buildLib.populateBuilds(champions);
    // if(failedBuilds.length > 0) {
    //     console.log(`Build failures: ${failedBuilds.length}`);
    //     for(let i in failedBuilds) {
    //         console.log(`Build failure for: ${failedBuilds[i]}`);
    //     }
    // }

    console.log("Finished");
}

main();
