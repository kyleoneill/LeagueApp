import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    itemImage: {
        height: "50px",
        width: "50px"
    }
}));

function nunuSpecialCase(props) {
    props.counters.strong_against = props.counters.strong_against.replace(/\s&\s/g, " and ");
    props.counters.weak_against = props.counters.weak_against.replace(/\s&\s/g, " and ");
}

function CounterSection(props) {
    let arr = props.counters.split('&');
    return(
        <ul>
            {arr.map((text, index) => (
                <li key={props.type + index}>{text.substring(0, text.length - 2)} - Winrate: {text.substring(text.length - 2, text.length)}%</li>
            ))}
        </ul>
    )
}

export default function CounterDisplay(props) {
    const classes = useStyles();
    nunuSpecialCase(props);
    return(
        <div className="build-counters">
            <h2>Counters</h2>
            <div className="counter-section counter-strong">
                <h3>Strong Against</h3>
                <p>{props.name} counters these champions</p>
                <CounterSection type="strong" counters={props.counters.strong_against} />
            </div>
            <div className="counter-section counter-weak">
                <h3>Weak Against</h3>
                <p>{props.name} is weak against these champions</p>
                <CounterSection type="weak" counters={props.counters.weak_against} />
            </div>
        </div>
    )
}