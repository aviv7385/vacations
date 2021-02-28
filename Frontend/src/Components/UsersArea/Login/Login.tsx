import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { History } from "history";
import { useForm } from "react-hook-form";
import { Globals } from "../../../Services/Globals";
import UserModel from "../models/UserModel";
import "./Login.css";

interface LoginProps {
    history: History;
}

function Login(props: LoginProps): JSX.Element {
    // create form
    const { register, handleSubmit, errors } = useForm<UserModel>();

    async function sendData(user: UserModel) {
        try {
            const response = await axios.post(Globals.vacationsUrl + "auth/login", user);
            const loggedInUser = response.data;
            alert("You have successfully logged in!");
            props.history.push("/vacations");
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

                <button>Submit</button>
            </form>
        </div>
    );
}

export default Login;
