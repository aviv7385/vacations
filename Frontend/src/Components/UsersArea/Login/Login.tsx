import { Typography } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Globals } from "../../../Services/Globals";
import UserModel from "../models/UserModel";
import "./Login.css";
import { NavLink, useHistory } from "react-router-dom";
import { UserActionType } from "../../../Redux/UserState";
import store from "../../../Redux/Store";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";


// this component will be displayed to any user (even if not registered) and will allow any user (regular or admin) to login. 

function Login(): JSX.Element {

    const history = useHistory();

    // check if user is logged-in - if yes - show vacations, if not - redirect to login page
    if (store.getState().UserReducer.user !== null) {
        // check if user is Admin - if yes, redirect to Admin page, if not - redirect to vacations page
        if (store.getState().UserReducer.user.isAdmin) {
            history.push("/admin");
        }
        else {
            history.push("/vacations");
        }
    }

    // create form
    const { register, handleSubmit, errors } = useForm<UserModel>();

    async function sendData(user: UserModel) {
        try {
            // send data to the server:
            const response = await axios.post(Globals.vacationsUrl + "auth/login", user);
            const loggedInUser = response.data;
            // update the user state:
            const action = { type: UserActionType.UserLoggedIn, payload: loggedInUser }
            store.dispatch(action);
            alert("You have successfully logged in!");

            // connect to socket.io:
            socketManagerInstance.connect();

            // check if user is Admin - if yes, redirect to Admin page, if not - redirect to vacations page
            if (store.getState().UserReducer.user.isAdmin) {
                history.push("/admin");
            }
            else {
                history.push("/vacations");
            }
        }
        catch (err) {
            console.log(err);
            alert("Incorrect username or password\nPlease try again or register");
        }
    }

    return (
        <div className="Login">
            <Typography variant="h4" component="h4" color="primary">
                Login
            </Typography>

            <form onSubmit={handleSubmit(sendData)}>
                <input type="text" name="username" placeholder="Username" ref={register({ required: true })} />
                {errors.username?.type === "required" && <span>Must enter username</span>}

                <input type="text" name="password" placeholder="Password" ref={register({ required: true })} />
                {errors.password?.type === "required" && <span>Must enter password</span>}

                <button>Submit</button> <br /><br />

                <Typography variant="body1" component="h6" color="primary">
                    <NavLink to="/register" exact>Not a member yet? Register here</NavLink>
                </Typography>
            </form>
        </div>
    );
}

export default Login;
