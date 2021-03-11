import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    placeholder: {
        height: "50px",
        width: "50px"
    }
}));

export default function StatDisplay(props) {
    const classes = useStyles();
    return(
        <div className="build-stats">
            <p>Win Rate: {props.stats.win_rate}%</p>
            <p>Pick Rate: {props.stats.pick_rate}%</p>
            <p>Ban Rate: {props.stats.ban_rate}%</p>
        </div>
    )
}