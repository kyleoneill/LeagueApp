const fs = require("fs");

function main() {
    let champions = require("./champion.json");
    let champs = [];
    for(let i in champions.data) {
        champs.push(champions.data[i].name);
    }
    fs.writeFile("human_readable_names.json", JSON.stringify(champs, null, 2), function(err) {
        if (err) throw err;
    });
}

main();