import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import Typography from '@material-ui/core/Typography';
import "./WelcomeUser.css";

// this component will be displayed to any user (registered or anonymous)
// if it's an anonymous user - will be displayed "hello guest"
// if it's a registered user (regular/admin) - will be displayed "hello (user.firstName + user.lastName)"


interface WelcomeUserState {
    userFirstName: string;
}

class WelcomeUser extends Component<{}, WelcomeUserState> {
    // a function for stop listening (stop subscribing)
    private unsubscribeStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        // if user is logged in, get their first & last names from the user state
        if(store.getState().UserReducer.user) {
            this.state = { userFirstName: store.getState().UserReducer.user.firstName.toLocaleUpperCase() + " " + store.getState().UserReducer.user.lastName.toLocaleUpperCase() } // with redux
        }
        // if user is not logged in - change the displayed name to "guest"
        else {
            this.state = { userFirstName: "GUEST" }; 
        }
    }

    public componentDidMount(): void {
        // start listening for changes
        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ userFirstName: store.getState().UserReducer.user.firstName.toLocaleUpperCase() + " " + store.getState().UserReducer.user.lastName.toLocaleUpperCase() })
        });  
    }

    public render(): JSX.Element {
        return (
            <div className="WelcomeUser">
                <Typography>
                <span>HELLO {this.state.userFirstName}</span>
                </Typography>
            </div>
        );
    }

    // Stop listening for changes.
    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }
}

export default WelcomeUser;
