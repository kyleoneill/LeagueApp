import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
}));
export default function HeaderBar(props) {
    const classes = useStyles();
    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" noWrap>
                {props.appName}
            </Typography>
            </Toolbar>
        </AppBar>
    )
}