import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import "./AdminVacationsList.css";
import VacationModel from "../../VacationsArea/models/VacationModel";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import { Button, Typography } from "@material-ui/core";
import { NavLink, RouteComponentProps } from "react-router-dom";


interface AdminVacationsListState {
    vacations: VacationModel[];
}


class AdminVacationsList extends Component<{}, AdminVacationsListState>{

    public constructor(props: {}) {
        super(props);

        // without redux:
        this.state = { vacations: [] }

        // with redux:
        //this.state = { vacations: store.getState().VacationsReducer.vacations };
    }

    public async componentDidMount() {
        try {

            // get vacations without redux:
            const response = await axios.get<VacationModel[]>(Globals.vacationsUrl); // get data from the server
            const vacations = response.data;
            this.setState({ vacations });


            // // get vacations with redux:
            // if (store.getState().VacationsReducer.vacations.length === 0) {
            //     const response = await axios.get<VacationModel[]>(Globals.vacationsUrl); // get data from the server
            //     const vacations = response.data;
            //     const action = { type: VacationsActionType.VacationsDownloaded, payload: vacations };
            //     store.dispatch(action);
            //     this.setState({ vacations: store.getState().VacationsReducer.vacations }); // update the local state with data from the store 
            //     console.log(vacations);
            //}
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("Error");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="AdminVacationsList">
                <div className="VacationsList">
                    <Typography variant="h4" component="h4" color="primary">
                        Available Vacations
                    </Typography>
                    <br />
                    <Button variant="contained" color="primary">
                        <NavLink to="/admin/add-vacation" exact>Add New Vacation</NavLink>
                    </Button>

                    <div className="Card">
                        {this.state.vacations.map(v => <AdminVacationCard key={v.vacationId} singleVacation={v} />)}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminVacationsList;
