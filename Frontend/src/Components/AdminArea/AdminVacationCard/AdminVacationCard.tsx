import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Globals } from "../../../Services/Globals";
import "./AdminVacationCard.css";
import VacationModel from "../../VacationsArea/models/VacationModel";

interface AdminVacationCardProps {
    singleVacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {
    // material UI card
    const useStyles = makeStyles({
        root: {
            maxWidth: 300,
        },
        media: {
            height: 140,
        },
    });
    const classes = useStyles();

    return (
        <div className="AdminVacationCard">
            <Box m={5} component="div" display="inline-block">
                <Card className={classes.root}>
                    <CardActionArea>
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
                                    <Tooltip title="Edit">
                                        <EditOutlinedIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                                <IconButton aria-label="settings">
                                    <Tooltip title="Delete">
                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            </Typography>
                        </CardContent>

                    </CardActionArea>
                </Card>
            </Box>
        </div>
    );
}

export default AdminVacationCard;
