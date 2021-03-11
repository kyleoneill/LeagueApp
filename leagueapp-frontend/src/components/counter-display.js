import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    itemImage: {
        height: "50px",
        width: "50px"
    }
}));

export default function CounterDisplay(props) {
    const classes = useStyles();
    return(
        <div className="build-counters">
            <h2>Counters</h2>
            <div className="counter-strong">
                <h3>Strong Against</h3>
                <p>{props.counters.strong_against}</p>
            </div>
            <div className="counter-weak">
                <h3>Weak Against</h3>
                <p>{props.counters.weak_against}</p>
            </div>
        </div>
    )
}