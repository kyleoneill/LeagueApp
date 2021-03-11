import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    runeImage: {
        height: "50px",
        width: "50px"
    }
}));

function importAll(r) {
    let images = {};
    let keys = r.keys()
    for(let i in keys) {
        images[keys[i].replace('./', '')] = r(keys[i]);
    }
    return images;
}

const runeImages = importAll(require.context('../assets/runes', false, /\.(png|jpe?g|svg)$/));

function cleanRuneName(name) {
    return name.replace(/[^a-zA-Z]/g, '').toLowerCase();
}

function RuneSection(props) {
    const classes = useStyles();
    let sections;
    let arr = props.runes.split('&');
    try {
        sections = arr.map((text, index) => (
            <div key={text + "-head-" + index}>
                <li key={text + "-" + index}>{text}</li>
                <img 
                    key={text + "-img-" + index}
                    src={runeImages[cleanRuneName(text) + ".png"].default}
                    alt={text}
                    className={classes.runeImage}
                />
            </div>
        ))
    }
    catch(e) {
        sections = <div>Error rendering rune section</div>
    }
    return(
        <>
            {sections}
        </>
    )
}

export default function RuneDisplay(props) {
    const classes = useStyles();
    return(
        <div className="build-runes">
            <div className="build-primary-runes">
                <h3>Primary Runes</h3>
                <ol>
                    <RuneSection runes={props.runes.rune_primary} />
                </ol>
            </div>
            <div className="build-secondary-runes">
                <h3>Secondary Runes</h3>
                <ol>
                    <RuneSection runes={props.runes.rune_secondary} />
                </ol>
            </div>
            <div className="build-tertiary-runes">
                <h3>Tertiary Runes</h3>
                <ol>
                    <RuneSection runes={props.runes.rune_tertiary} />
                </ol>
            </div>
        </div>
    )
}