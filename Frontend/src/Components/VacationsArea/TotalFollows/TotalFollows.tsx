import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Globals } from "../../../Services/Globals";
import "./TotalFollows.css";

interface MatchParams {
    vacationId: string;
}

interface TotalFollowsProps extends RouteComponentProps<MatchParams> {

}

interface TotalFollowsState {
    total: number;
}

class TotalFollows extends Component<TotalFollowsProps, TotalFollowsState> {

    public constructor(props: TotalFollowsProps) {
        super(props);
        this.state = { total: 0 };
    }

    public async componentDidMount() {
        try {
            const vacationId = +this.props.match.params.vacationId;
            const response = await axios.get(Globals.vacationsUrl + "count-follows/" + vacationId);
            const numberOfFollows = response.data[0];
            this.setState({ total: numberOfFollows });
        }
        catch (err) {
            console.log(err.message);
            alert("Error");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="TotalFollows">

            </div>
        );
    }
}

export default TotalFollows;
