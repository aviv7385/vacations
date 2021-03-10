import { Badge, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Globals } from "../../../Services/Globals";
import VacationModel from "../models/VacationModel";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./VacationCard.css";
import { RouteComponentProps } from "react-router-dom";
import UserModel from "../../UsersArea/models/UserModel";
import store from "../../../Redux/Store";
import axios from "axios";
import FollowedVacations from "../FollowedVacations/FollowedVacations";
import FollowsModel from "../models/FollowsModel";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";



interface VacationCardProps {
    singleVacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

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

    const [isFollowed, setIsFollowed] = useState(props.singleVacation.isFollowed);
    const [iconColor, setIconColor] = useState(props.singleVacation.isFollowed ? "red": "");
    // ================================================================

    // follow a vacation (add new follow) or unfollow it
    async function followVacation() {
        try {
            const follow = new FollowsModel();
            follow.vacationId = props.singleVacation.vacationId;
            follow.userId = store.getState().UserReducer.user.userId;
            console.log(follow);
            //console.log(followsArray);
            if (isFollowed) {
                console.log(follow.vacationId)
                await axios.delete<FollowsModel>(Globals.vacationsUrl + `follows/${store.getState().UserReducer.user.userId}/${props.singleVacation.vacationId}/`);
                alert(`vacation ${follow.vacationId} was unfollowed`);
                setIconColor("");
                setIsFollowed(false);
                return;
            }
            setIsFollowed(true);
            await axios.post<FollowsModel>(Globals.vacationsUrl + "follows/", follow);
            alert(`vacation ${follow.vacationId} is now followed`);
            setIconColor("red");
        }
        catch (err) {
            console.log(err)
            console.log(err.message);
            alert("Error!");
        }
    }


    return (
        <div className="VacationCard">
            <Box m={5} component="div" display="inline-block">
                <Card className={classes.root}>
                    {/* <CardActionArea> */}
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
                                <IconButton aria-label="settings" onClick={followVacation} style={{color:iconColor}} >
                                    <FavoriteIcon />
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
                                <Badge badgeContent={props.singleVacation.followersCount} color="secondary">
                                    <FavoriteIcon />
                                </Badge>
                            </Tooltip>
                        </Typography>
                    </CardContent>

                    {/* </CardActionArea> */}
                </Card>
            </Box>

        </div>
    )
}

export default VacationCard;
