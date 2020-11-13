import { makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
} from "@material-ui/core";
import RuneDisplay from "./rune-display";
const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& div' : {
            margin: "0 50px 0px 0px"
        }
    },
    columnContainer: {
        display: "flex",
        flexWrap: "nowrap"
    }
}));

export default function ChampionDisplay(props) {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Toolbar />
            {props.champName !== "" &&
                <>
                    <h1>{props.champName}</h1>
                    <div className={classes.columnContainer}>
                        <div className="build-items">
                            <h3>Items</h3>
                            <ol>
                                {props.build.items.map((text, index) => (
                                    <li key={text + "-" + index}>{text}</li>
                                ))}
                            </ol>
                        </div>
                        <RuneDisplay
                            build={props.build}
                        />
                        <div className="champion-counters">
                            <h2>Counters</h2>
                            <div className="counter-strong">
                                <h3>Strong Against</h3>
                                <ol>
                                    {props.build.strongAgainst.map((text, index) => (
                                        <li key={text + "-" + index}>{text}</li>
                                    ))}
                                </ol>
                            </div>
                            <div className="counter-weak">
                                <h3>Weak Against</h3>
                                <ol>
                                    {props.build.weakAgainst.map((text, index) => (
                                        <li key={text + "-" + index}>{text}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </>
            }
        </main>
    )
}