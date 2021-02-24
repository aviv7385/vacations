import { Badge, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Globals } from "../../../Services/Globals";
import VacationModel from "../models/VacationModel";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./VacationCard.css";

interface VacationCardProps {
    singleVacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
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
        <div className="VacationCard">
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
                            action={
                                <Tooltip title="Follow">
                                    <IconButton aria-label="settings">
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            title={props.singleVacation.destination}
                        />

                        <CardContent>
                            <Typography variant="body1" color="textSecondary" component="p" align="left">
                                {props.singleVacation.description} <br />
                                From: {props.singleVacation.fromDate} <br />
                                To: {props.singleVacation.toDate} <br />
                                Price: ${props.singleVacation.price} <br />
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p" align="right">
                                <Tooltip title="Followers">
                                    <Badge badgeContent={4} color="secondary">
                                        <FavoriteIcon />
                                    </Badge>
                                </Tooltip>
                            </Typography>
                        </CardContent>

                    </CardActionArea>
                </Card>
            </Box>

        </div>
    )
}

export default VacationCard;
