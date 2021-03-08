import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Globals } from "../../../Services/Globals";
import "./AdminVacationCard.css";
import VacationModel from "../../VacationsArea/models/VacationModel";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";




interface AdminVacationCardProps {
    singleVacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    // create history object by using the useHistory() hook  (to redirect to another page)
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

    // // update the vacations data in the state
    // const vacationsArray = useState<VacationModel[]>([]);
    // const vacationsList = vacationsArray[0]; // the data
    // const setVacations = vacationsArray[1]; // the function that updates the data in the state

    // // with any change to state - update it 
    // useEffect(() => {
    //     (async function () {
    //         const response = await axios.get<VacationModel[]>(Globals.vacationsUrl);
    //         const vacations = response.data;
    //         setVacations(vacations);

    //     })();
    // });

    //=============================================================================================

    async function removeVacation() {
        try {
            const vacationId = props.singleVacation.vacationId;
            const destination = props.singleVacation.destination;
            const answer = window.confirm(`Are you sure you want to remove the ${destination} vacation?`);
            if (!answer) {
                return;
            }
            await axios.delete<VacationModel>(Globals.vacationsUrl + vacationId);
            history.push("/admin");
        }
        catch (err) {
            console.log(err)
            console.log(err.message);
            alert("Error!");
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
