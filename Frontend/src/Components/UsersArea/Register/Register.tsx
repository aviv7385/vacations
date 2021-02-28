import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { History } from "history";
import { useForm } from "react-hook-form";
import { Globals } from "../../../Services/Globals";
import UserModel from "../models/UserModel";
import "./Register.css";
import { UserActionType } from "../../../Redux/UserState";
import store from "../../../Redux/Store";

interface RegisterProps {
    history: History;
}

function Register(props: RegisterProps): JSX.Element {

    // create form
    const { register, handleSubmit, errors } = useForm<UserModel>();

    async function sendData(user: UserModel) {
        try {
            const response = await axios.post(Globals.vacationsUrl + "auth/register", user);
            const addedUser = response.data;

            const action = { type: UserActionType.UserRegistered, payload: addedUser };
            store.dispatch(action);

            alert("You have successfully registered!");
            props.history.push("/login");
        }
        catch (err) {
            console.log(err);
            alert("Username is already taken, please choose a different one");
        }
    }


    return (
        <div className="Register">
            <Typography variant="h4" component="h4" color="primary">
                Registration
            </Typography>

            <form onSubmit={handleSubmit(sendData)}>

                <input type="text" name="firstName" placeholder="First Name" ref={register({ required: true })} />
                {errors.firstName?.type === "required" && <span>Must enter first name</span>}

                <input type="text" name="lastName" placeholder="Last Name" ref={register({ required: true })} />
                {errors.lastName?.type === "required" && <span>Must enter last name</span>}

                <input type="text" name="username" placeholder="Username" ref={register({ required: true })} />
                {errors.username?.type === "required" && <span>Must enter username</span>}

                <input type="text" name="password" placeholder="Password" ref={register({ required: true, minLength: 6 })} />
                {errors.password?.type === "required" && <span>Must enter password</span>}
                {errors.password?.type === "minLength" && <span>Password must have at least 6 characters</span>}

                <button>Submit</button>
            </form>
        </div>
    );
}

export default Register;
