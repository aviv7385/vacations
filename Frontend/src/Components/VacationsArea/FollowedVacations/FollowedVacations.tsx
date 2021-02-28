import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Globals } from "../../../Services/Globals";
import FollowsModel from "../models/FollowsModel";
import "./FollowedVacations.css";


interface MatchParams {
    uuid: string;
}

interface FollowedVacationsProps extends RouteComponentProps<MatchParams> {
	
}

interface FollowedVacationsState {
	followedVacations: FollowsModel[];
}

class FollowedVacations extends Component<FollowedVacationsProps, FollowedVacationsState> {

    public constructor(props: FollowedVacationsProps) {
        super(props);
        this.state = { followedVacations: [] }
    }

    public async componentDidMount() {
        try {
            // get all vacations followed by a specific user
            const uuid = this.props.match.params.uuid;
            const response = await axios.get<FollowsModel[]>(Globals.vacationsUrl + "follows/" + uuid);
            const followedVacations = response.data;
            this.setState({followedVacations});
            console.log(followedVacations);
        }
        catch (err) {
            console.log(err);
            alert("Error");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="FollowedVacations">
				
            </div>
        );
    }
}

export default FollowedVacations;
