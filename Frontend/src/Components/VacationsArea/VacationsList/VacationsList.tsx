import { Typography } from "@material-ui/core";
import axios from "axios";
import { History } from "history";
import React, { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import FollowsModel from "../models/FollowsModel";
import VacationModel from "../models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

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

        // with redux:
        this.state = { 
            vacations: store.getState().VacationsReducer.vacations
         };
    }


    public async componentDidMount() {
        try {
            // get all vacations:
            this.unsubscribeFromStore = store.subscribe(() => {
                console.log("subscribe triggered");
                //let vacations = store.getState().VacationsReducer.vacations;
                //const followsCounts = store.getState().FollowsReducer.followsCounts;
                this.setState({ 
                    vacations: store.getState().VacationsReducer.vacations
                });
                
            });

            if (store.getState().UserReducer.user !== null) {
                if (store.getState().VacationsReducer.vacations.length === 0) {
                    const response = await axios.get<VacationModel[]>(Globals.vacationsUrl,{ // get data from the server
                        headers: { //send token header
                            'Authorization': `token ${store.getState().UserReducer.user.token}`
                        }
                    }); 
                    const vacations = response.data;
                    let followsResponse = await axios.get<FollowsModel[]>(Globals.vacationsUrl + `follows/${store.getState().UserReducer.user.uuid}`);
                    followsResponse.data.forEach((vacFollow) => {
                        vacations.forEach((vac) => {
                            if(vac.vacationId == vacFollow.vacationId) {
                                vac.isFollowed = true;
                                return; //break from internal foreach
                            }
                        });
                    });
                    const action = { type: VacationsActionType.VacationsDownloaded, payload: vacations };
                    store.dispatch(action);
                    //this.setState({ vacations: store.getState().VacationsReducer.vacations }); // update the local state with data from the store 
                    console.log(vacations);
                }
                

            }
            else {
                alert("You need to log in first");
                this.props.history.push("/login");
            }

        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("Error");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="VacationsList">
                <Typography variant="h4" component="h4" color="primary">
                    Our Available Vacations
                </Typography>

                <div className="Card">
                    {this.state.vacations.map(v => <VacationCard key={v.vacationId} singleVacation={v}/>)}
                </div>
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeFromStore();
    }
}



export default VacationsList;
