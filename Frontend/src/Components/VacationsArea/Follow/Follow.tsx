import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import store from "../../../Redux/Store";
import { Globals } from "../../../Services/Globals";
import FollowedVacations from "../FollowedVacations/FollowedVacations";
import FollowsModel from "../models/FollowsModel";
import "./Follow.css";



interface FollowProps {

}

interface FollowState {
    followedVacations: FollowsModel[];
}

class Follow extends Component<FollowProps, FollowState> {

    public constructor(props: FollowProps) {
        super(props);
        //this.state = { followedVacations: [] }; // without redux
        this.state = { followedVacations: store.getState().FollowsReducer.followedVacations }
    }

    public async componentDidMount() {
        try {
            // add new follow 
            const response = await axios.post<FollowsModel[]>(Globals.vacationsUrl + "follow/");
            const newFollow = response.data;
            this.setState({ followedVacations: newFollow });
            console.log(newFollow);
        }
        catch (err) {
            console.log(err.message);
            alert("Error");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="Follow">

            </div>
        );
    }
}

export default Follow;
