import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import "./WelcomeUser.css";


interface WelcomeUserState {
    userFirstName: string;
}

class WelcomeUser extends Component<{}, WelcomeUserState> {
    // a function for stop listening (stop subscribing)
    private unsubscribeStore: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { userFirstName: "GUEST" };
    }

    public componentDidMount(): void {
        // start listening for changes
        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ userFirstName: store.getState().user.firstName.toLocaleUpperCase() + " " + store.getState().user.lastName.toLocaleUpperCase() })
        });
    }

    public render(): JSX.Element {
        return (
            <div className="WelcomeUser">
                <span>HELLO {this.state.userFirstName}</span>

            </div>
        );
    }

    // Stop listening for changes.
    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }
}

export default WelcomeUser;
