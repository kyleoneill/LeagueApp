import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    itemImage: {
        height: "50px",
        width: "50px"
    }
}));

function RenderItems(props) {
    const classes = useStyles();
    let arr = props.itemGroup.split('&');
    return(
        <div className="item-section">
            <h3>{props.name}</h3>
            <ul>
                {arr.map((text, index) => (
                    <li key={text + "-" + index}>{text}</li>
                ))}
            </ul>
        </div>
    )
}

export default function ItemDisplay(props) {
    const classes = useStyles();
    return(
        <div className="build-items">
            <RenderItems name="Starting" itemGroup={props.items.starting} />
            <RenderItems name="Mythic and Core" itemGroup={props.items.mythic_core} />
            <RenderItems name="Fourth Item" itemGroup={props.items.fourth} />
            <RenderItems name="Fifth Item" itemGroup={props.items.fifth} />
            <RenderItems name="Sixth Item" itemGroup={props.items.sixth} />
        </div>
    )
}