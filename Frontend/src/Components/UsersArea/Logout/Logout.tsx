import React, { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import Typography from '@material-ui/core/Typography';
import { History } from "history";
import "./Logout.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";


interface LogoutProps {
     history: History
}

interface LogoutState {
    isLoggedIn: boolean
}

class Logout extends Component<LogoutProps, LogoutState> {


    private unsubscribeStore: Unsubscribe;

    public constructor(props: LogoutProps) {
        super(props);
        if (store.getState().UserReducer.user !== null){
            this.state = { isLoggedIn: true };
        }
        else {
            this.state = { isLoggedIn: false };
        }
        this.clickHandle = this.clickHandle.bind(this);
    }

    public  componentDidMount():void {
        // start listening for changes
        this.unsubscribeStore = store.subscribe(() => {
            if (store.getState().UserReducer.user !== null){
                this.setState({ isLoggedIn: true })
            }
            else {
                this.setState({ isLoggedIn: false });
                
            }
        });
    }

    public clickHandle(): void {
        if (store.getState().UserReducer.user !== null) {
            sessionStorage.removeItem("user");
            //this.props.history.push("/login");
            window.location.replace("/login");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="Logout">
                       {this.state.isLoggedIn && <Button color="inherit" onClick={this.clickHandle}>Logout</Button>}
            </div>
        );
    }
     // Stop listening for changes.
     public componentWillUnmount(): void {
        this.unsubscribeStore();
    }
}

export default Logout;
