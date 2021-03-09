import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import store from "../../../Redux/Store";
import { History } from "history";
import { VacationsActionType } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import "./AdminVacationsList.css";
import VacationModel from "../../VacationsArea/models/VacationModel";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import { Button, Typography } from "@material-ui/core";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { Unsubscribe } from "redux";


interface AdminVacationsListState {
    vacations: VacationModel[];
}
interface AdminVacationsProps {
    history: History;
}


class AdminVacationsList extends Component<AdminVacationsProps, AdminVacationsListState>{

    private unsubscribeFromStore: Unsubscribe;

    public constructor(props: AdminVacationsProps) {
        super(props);

        // with redux:
        this.state = { vacations: store.getState().VacationsReducer.vacations };
    }

    public async componentDidMount() {
        try {
            // get all vacations:
            this.unsubscribeFromStore = store.subscribe(() => {
                this.setState({ vacations: store.getState().VacationsReducer.vacations });
            });

            if (store.getState().UserReducer.user !== null) {


                if (store.getState().VacationsReducer.vacations.length === 0) {
                    const response = await axios.get<VacationModel[]>(Globals.vacationsUrl); // get data from the server
                    const vacations = response.data;
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
    public componentWillUnmount(): void {
        this.unsubscribeFromStore();
    }
}

export default AdminVacationsList;
