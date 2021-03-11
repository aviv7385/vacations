import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import { History } from "history";
import { Button } from "@material-ui/core";

// this component  will allow any user (regular or admin) to logout. 


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
        // check if user is logged in and change the boolean variable isLoggedIn accordingly
        if (store.getState().UserReducer.user !== null) {
            this.state = { isLoggedIn: true };
        }
        else {
            this.state = { isLoggedIn: false };
        }
        this.clickHandle = this.clickHandle.bind(this);
    }

    public componentDidMount(): void {
        // start listening for changes
        this.unsubscribeStore = store.subscribe(() => {
            if (store.getState().UserReducer.user !== null) {
                this.setState({ isLoggedIn: true })
            }
            else {
                this.setState({ isLoggedIn: false });

            }
        });
    }

    // a function for the "Logout" button
    public clickHandle(): void {
        if (store.getState().UserReducer.user !== null) {
            sessionStorage.removeItem("user");
            // after logging out - redirect to "Login" page:
            window.location.replace("/login");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="Logout">
                {/* display the "logout" button only if the user is logged in */}
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
