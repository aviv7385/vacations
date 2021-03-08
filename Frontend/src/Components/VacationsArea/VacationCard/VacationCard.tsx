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


    const [iconColor,setIconColor] = useState("");
    // ================================================================

    const uuid = store.getState().UserReducer.user.uuid;
    let followsArray = [{ userId: 1, vacationId: 1 }];
    useEffect(() => {
        // get all followed vacations (by user's uuid)
        (async function getFollowedVacation() {
            try {
                const response = await axios.get<FollowsModel[]>(Globals.vacationsUrl + `follows/${uuid}`);
                followsArray = response.data;
                console.log(followsArray);
            }
            catch (err) {
                console.log(err)
                console.log(err.message);
                alert("Error!");
            }
        })();
    });



    // follow a vacation (add new follow) or unfollow it
    async function followVacation() {
        try {
            
            const follow = new FollowsModel();
            follow.vacationId = props.singleVacation.vacationId;
            follow.userId = store.getState().UserReducer.user.userId;
            console.log(follow);
            console.log(followsArray);
            for (const obj of followsArray) {
                if (follow.vacationId === obj.vacationId) {
                    console.log(follow.vacationId)
                    await axios.delete<FollowsModel>(Globals.vacationsUrl + `follows/${store.getState().UserReducer.user.uuid}/${props.singleVacation.vacationId}/`);
                    alert(`vacation ${follow.vacationId} was unfollowed`);
                    setIconColor("");
                    return;
                }
                break;
            }
            await axios.post<FollowsModel>(Globals.vacationsUrl + "follows/", follow);
            alert(`vacation ${follow.vacationId} is now followed`);
            console.log("updated: " + followsArray);
            setIconColor("secondary");
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
                                        <FavoriteIcon  />
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

                    {/* </CardActionArea> */}
                </Card>
            </Box>

        </div>
    )
}

export default VacationCard;
