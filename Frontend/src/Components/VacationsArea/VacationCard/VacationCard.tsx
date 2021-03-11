import { Badge, Box, Card, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { useState } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Globals } from "../../../Services/Globals";
import VacationModel from "../models/VacationModel";
import "./VacationCard.css";
import store from "../../../Redux/Store";
import axios from "axios";
import FollowsModel from "../models/FollowsModel";


// this component will create a vacation card for any user that is not admin 
// it will have the follow/unfollow feature + will display total number of followers for the specific vacation

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

    // create a flag to check if a specific vacation is followed by the user
    const [isFollowed, setIsFollowed] = useState(props.singleVacation.isFollowed);

    // if a specific vacation is followed by the user - change the "follow" icon's color to red.
    // if it is not followed by the user - change it to the default color (in this case - grey)
    const [iconColor, setIconColor] = useState(props.singleVacation.isFollowed ? "red" : "");
    // ================================================================

    // follow a vacation (add new follow) or unfollow it
    async function followVacation() {
        try {
            // create a follow obj, using the follow model
            const follow = new FollowsModel();
            follow.vacationId = props.singleVacation.vacationId; // get the vacationId from the props
            follow.userId = store.getState().UserReducer.user.userId; // get the userId from the user state

            // if the vacation is already followed by the user - unfollow it 
            if (isFollowed) {
                // send data to server 
                await axios.delete<FollowsModel>(Globals.vacationsUrl + `follows/${store.getState().UserReducer.user.userId}/${props.singleVacation.vacationId}/`);
                // change the follow icon's color to the default color
                setIconColor("");
                // change the "isFollowed" flag to false
                setIsFollowed(false);
                return;
            }
            // if the vacation is not followed by the user - follow it
            setIsFollowed(true);
            // send data to the server
            await axios.post<FollowsModel>(Globals.vacationsUrl + "follows/", follow);
            // change the follow icon's color to red
            setIconColor("red");
        }
        catch (err) {
            console.log(err)
            console.log(err.message);
            alert("Something went wrong.");
        }
    }


    return (
        <div className="VacationCard">
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
                        action={
                            <Tooltip title="Follow">
                                <IconButton aria-label="settings" onClick={followVacation} style={{ color: iconColor }} >
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
                            <Tooltip title="Total Followers">
                                <Badge badgeContent={props.singleVacation.followersCount} color="secondary">
                                    <FavoriteIcon />
                                </Badge>
                            </Tooltip>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

        </div>
    )
}

export default VacationCard;
