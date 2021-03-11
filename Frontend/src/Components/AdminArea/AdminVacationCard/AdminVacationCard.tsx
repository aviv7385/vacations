import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Globals } from "../../../Services/Globals";
import "./AdminVacationCard.css";
import VacationModel from "../../VacationsArea/models/VacationModel";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { VacationsActionType } from "../../../Redux/VacationsState";
import store from "../../../Redux/Store";


// this component will create a vacation card for admin only (it will have the "edit vacation" and "delete vacation" features)

interface AdminVacationCardProps {
    singleVacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    // create history object to redirect to another page
    const history = useHistory();

    // using material UI  for the card
    const useStyles = makeStyles({
        root: {
            maxWidth: 300,
        },
        media: {
            height: 140,
        },
    });
    const classes = useStyles();

    // =========================================================================================

    // a function to delete a vacation from the server (by clicking the "remove" icon)
    async function removeVacation() {
        try {
            const vacationId = props.singleVacation.vacationId;
            const destination = props.singleVacation.destination;
            const answer = window.confirm(`Are you sure you want to remove the ${destination} vacation?`);
            if (!answer) {
                return;
            }
            // send data to the server
            await axios.delete<VacationModel>(Globals.adminUrl + vacationId, {
                headers: { //send token header
                    'Authorization': `token ${store.getState().UserReducer.user.token}`
                }
            });
            // with redux:
            const action = { type: VacationsActionType.VacationDeleted, payload: vacationId };
            store.dispatch(action); // update the vacations state
            history.push("/admin");
        }
        catch (err) {
            console.log(err)
            console.log(err.message);
            alert("Something went wrong.");
        }
    }

    return (
        <div className="AdminVacationCard">
            <Box m={5} component="div" display="inline-block">
                <Card className={classes.root}>
                    <CardMedia
                        component="img"
                        alt={props.singleVacation.destination}
                        className={classes.media}
                        image={Globals.vacationsUrl + "images/" + props.singleVacation.imageFileName}
                        title={props.singleVacation.destination}
                    />
                    <CardHeader
                        title={props.singleVacation.destination}
                    />

                    <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p" align="left">
                            {props.singleVacation.description} <br />
                                From: {props.singleVacation.fromDate} <br />
                                To: {props.singleVacation.toDate} <br />
                                Price: ${props.singleVacation.price} <br />
                        </Typography>
                        <Typography component="p" align="right">
                            <IconButton aria-label="settings" >
                                <NavLink className="Icon" to={"/admin/edit-vacation/" + props.singleVacation.vacationId}>
                                    <Tooltip title="Edit">
                                        <EditOutlinedIcon fontSize="small" />
                                    </Tooltip>
                                </NavLink>
                            </IconButton>

                            <IconButton aria-label="settings" onClick={removeVacation}>
                                <Tooltip title="Delete">
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>

                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default AdminVacationCard;
