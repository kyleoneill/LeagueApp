const { Build } = require("./database");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const utilityLib = require("./utility");

const BuildEnum = {
    ITEM: "item",
    RUNE: "rune"
}

function addTextFromChildElements(dom, buildType) {
    let str = "";
    for(let i = 0; i < dom.childElementCount; i++) {
        if(buildType == BuildEnum.RUNE && i == 0) {
            str += (dom.children[i].children[1].textContent + "&");
        }
        else {
            str += (dom.children[i].textContent + "&");
        }
    }
    return str.slice(0, -1);
}

async function populateBuilds(champions) {
    let failedChampions = []
    for(let i in champions) {
        try {
            let res = await utilityLib.httpsRequest(`https://rankedboost.com/league-of-legends/build/${champions[i]}/`);
            let dom = new JSDOM(res);
            dom = dom.window.document;
            
            let itemDom = dom.querySelector(".item-build-order-main");
            let runeDom = dom.querySelectorAll("#runes > .rb-build-rune-container")

            if(runeDom.length != 3) {
                throw new Error(`Three rune divs not present for champion ${champions[i]}`);
            }
            let primaryRune = addTextFromChildElements(runeDom[0], BuildEnum.RUNE);
            let secondaryRune = addTextFromChildElements(runeDom[1], BuildEnum.RUNE);
            let tertiaryRune = addTextFromChildElements(runeDom[2], BuildEnum.RUNE);
            let items = addTextFromChildElements(itemDom, BuildEnum.ITEM);

            await Build.create({
                champion: champions[i],
                items: items,
                runePrimary: primaryRune,
                runeSecondary: secondaryRune,
                runeTertiary: tertiaryRune
            })
        }
        catch(e) {
            console.error(`Build Error: ${e}`);
            failedChampions.push(champions[i]);
        }
        console.log(`Progress: ${parseInt(i) + 1}/${champions.length} - ${champions[i]}`);
        await utilityLib.sleep(150);
    }
    return failedChampions;
}

module.exports = {
    populateBuilds
}
