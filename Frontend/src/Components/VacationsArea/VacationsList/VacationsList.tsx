import { Typography } from "@material-ui/core";
import axios from "axios";
import { History } from "history";
import React, { Component } from "react";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import VacationModel from "../models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

interface VacationsListState {
    vacations: VacationModel[];
}

interface VacationsProps {
    history: History;
    isMounted: boolean;
}

class VacationsList extends Component<VacationsProps, VacationsListState> {

    public constructor(props: VacationsProps) {
        super(props);
        // without redux:
        this.state = { vacations: [] }

        // with redux:
        //this.state = { vacations: store.getState().VacationsReducer.vacations };
    }


    public async componentDidMount() {
     
        try {

            // without redux:
            const response = await axios.get<VacationModel[]>(Globals.vacationsUrl); // get data from the server
            const vacations = response.data;
            this.setState({ vacations });

    
            // // with redux:
            // if (store.getState().VacationsReducer.vacations.length === 0) {
            //     const response = await axios.get<VacationModel[]>(Globals.vacationsUrl); // get data from the server
            //     const vacations = response.data;
            //     const action = { type: VacationsActionType.VacationsDownloaded, payload: vacations };
            //     store.dispatch(action);
            //     this.setState({ vacations: store.getState().VacationsReducer.vacations }); // update the local state with data from the store 
            //     console.log(vacations);
            // }

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
                    {this.state.vacations.map(v => <VacationCard key={v.vacationId} singleVacation={v} />)}
                </div>
            </div>
        );
    }
}

export default VacationsList;
