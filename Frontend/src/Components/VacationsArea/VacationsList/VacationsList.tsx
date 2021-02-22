import axios from "axios";
import { Component } from "react";
import { Globals } from "../../../Services/Globals";
import VacationModel from "../models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

interface VacationsListState {
    vacations: VacationModel[];
}

class VacationsList extends Component<{}, VacationsListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { vacations: [] };
    }

    public async componentDidMount() {
        try {
            const response = await axios.get<VacationModel[]>(Globals.vacationsUrl);
            const vacations = response.data;
            this.setState({ vacations });
            console.log(vacations);
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
                <h2>Our Available Vacations</h2>

                <div className="Card">
                    {this.state.vacations.map(v => <VacationCard key={v.vacationId} singleVacation={v} />)}
                </div>
            </div>
        );
    }
}

export default VacationsList;
