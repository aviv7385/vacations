import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import Typography from '@material-ui/core/Typography';
import "./WelcomeUser.css";


interface WelcomeUserState {
    userFirstName: string;
}

class WelcomeUser extends Component<{}, WelcomeUserState> {
    // a function for stop listening (stop subscribing)
    private unsubscribeStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        if(store.getState().UserReducer.user) {
            this.state = { userFirstName: store.getState().UserReducer.user.firstName.toLocaleUpperCase() + " " + store.getState().UserReducer.user.lastName.toLocaleUpperCase() } // with redux
        }
        else {
            this.state = { userFirstName: "GUEST" }; // without redux
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
