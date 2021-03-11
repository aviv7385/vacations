import { Typography } from "@material-ui/core";
import axios from "axios";
import { History } from "history";
import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import FollowsModel from "../models/FollowsModel";
import VacationModel from "../models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";


// this component will display all available vacations to any user that is not admin

interface VacationsListState {
    vacations: VacationModel[];
}

interface VacationsProps {
    history: History;
}

class VacationsList extends Component<VacationsProps, VacationsListState> {

    private unsubscribeFromStore: Unsubscribe;

    public constructor(props: VacationsProps) {
        super(props);

        // update the local state using the Vacations state (redux)
        this.state = {
            vacations: store.getState().VacationsReducer.vacations
        };
    }


    public async componentDidMount() {
        // connect to socket.io:
        socketManagerInstance.connect();

        try {
            // start listening to changes:
            this.unsubscribeFromStore = store.subscribe(() => {
                this.setState({
                    vacations: store.getState().VacationsReducer.vacations
                });
            });

            // check if user is logged in:
            if (store.getState().UserReducer.user !== null) {
                // check if the vacations state already has all the vacations - if not - get the vacations from the server
                if (store.getState().VacationsReducer.vacations.length === 0) {
                    // get vacations data from the server:
                    const vacationsResponse = await axios.get<VacationModel[]>(Globals.vacationsUrl, {
                        headers: { //send token header
                            'Authorization': `token ${store.getState().UserReducer.user.token}`
                        }
                    });
                    const vacations = vacationsResponse.data;

                    // get follows data from the server:
                    let followsResponse = await axios.get<FollowsModel[]>(Globals.vacationsUrl + `follows/${store.getState().UserReducer.user.uuid}`);
                    // for each vacation check if it's followed by the user. if it is - set its isFollowed property to "true" 
                    followsResponse.data.forEach((vacFollow) => {
                        vacations.forEach((vac) => {
                            if (vac.vacationId == vacFollow.vacationId) {
                                vac.isFollowed = true;
                                //vac.sort = 1;
                                return;
                            }
                        });
                    });

                    // update the vacations state
                    const action = { type: VacationsActionType.VacationsDownloaded, payload: vacations };
                    store.dispatch(action);
                }
            }
            // if user is not logged in - show message and redirect to login page
            else {
                alert("You need to log in first");
                this.props.history.push("/login");
            }
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("Something went wrong");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="VacationsList">
                <Typography variant="h4" component="h4" color="primary">
                    Our Available Vacations
                </Typography>

                <div className="Card">
                    {this.state.vacations.map(v => <VacationCard key={v.vacationId} singleVacation={v} />)}
                </div>
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeFromStore();
    }
}

export default VacationsList;
