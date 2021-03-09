import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import Typography from '@material-ui/core/Typography';
import { History } from "history";
import "./Logout.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";


interface LogoutProps {
    history: History
}

interface LogoutState {
    user: {}
}

class Logout extends Component<LogoutProps, LogoutState> {

    public constructor(props: LogoutProps) {
        super(props);
        this.state = { user: store.getState().UserReducer.user };
    }

    public componentDidMount(): void {
        if (store.getState().UserReducer.user !== null) {

            this.setState({ user: null });

            sessionStorage.removeItem("user");
            this.props.history.push("/login");
        }
        
         // disconnect from socket.io:
         socketManagerInstance.disconnect();
    }

    public render(): JSX.Element {
        return (
            <div className="Logout">

            </div>
        );
    }
}

export default Logout;
