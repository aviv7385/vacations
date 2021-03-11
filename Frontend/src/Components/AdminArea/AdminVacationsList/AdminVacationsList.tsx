import axios from "axios";
import { Component } from "react";
import store from "../../../Redux/Store";
import { History } from "history";
import { VacationsActionType } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import "./AdminVacationsList.css";
import VacationModel from "../../VacationsArea/models/VacationModel";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import { Button, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";


// this component will display all vacations available - to admin only (will have the "add vacation" link)

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

            // check if user is logged-in
            if (store.getState().UserReducer.user !== null) {
                // check if there are vacations in the vacations state - if not - get the data from the server and send it to the vacations state
                if (store.getState().VacationsReducer.vacations.length === 0) {
                    // get data from the server
                    const response = await axios.get<VacationModel[]>(Globals.adminUrl, {
                        headers: { //send token header
                            'Authorization': `token ${store.getState().UserReducer.user.token}`
                        }
                    });
                    const vacations = response.data;
                    const action = { type: VacationsActionType.VacationsDownloaded, payload: vacations };
                    store.dispatch(action);
                }

            }
            // if user is not logged-in - show an alert and redirect to login page
            else {
                alert("You need to log in first");
                this.props.history.push("/login");
            }
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("You are not supposed to be here!");
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
