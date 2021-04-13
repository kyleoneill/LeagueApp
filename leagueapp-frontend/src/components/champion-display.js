import { makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
} from "@material-ui/core";
import StatDisplay from "./stats-display";
import RuneDisplay from "./rune-display";
import ItemDisplay from "./item-display";
import CounterDisplay from "./counter-display";
import { capitalizeFirstLetter } from "../util";
const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& div' : {
            margin: "0 50px 0px 0px"
        },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
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
                    <h1>{props.build.champ_stats.human_readable_name}</h1>
                    <h2>{capitalizeFirstLetter(props.build.champ_stats.title)}</h2>
                    <br />
                    <div className={classes.columnContainer}>
                        <StatDisplay
                            stats={props.build.champ_stats}
                        />
                        <ItemDisplay
                            items={props.build.items}
                        />
                        <RuneDisplay
                            runes={props.build.runes}
                        />
                        <CounterDisplay
                            counters={props.build.counters}
                            name={props.build.champ_stats.human_readable_name}
                        />
                    </div>
                </>
            }
        </main>
    )
}