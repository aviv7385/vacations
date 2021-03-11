import { RouteComponentProps } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { History } from "history";
import "./EditVacation.css";
import VacationModel from "../../VacationsArea/models/VacationModel";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import { VacationsActionType } from "../../../Redux/VacationsState";
import store from "../../../Redux/Store";


// this component will allow the Admin to edit an existing vacation (full update or partial update)


interface MatchParams {
    vacationId: string;
}

interface EditVacationProps extends RouteComponentProps<MatchParams> {
    history: History;
}

function EditVacation(props: EditVacationProps): JSX.Element {

    let fromDate;
    let toDate;

    // Use the useForm library: 
    const { register, handleSubmit, errors, setValue } = useForm<VacationModel>();

    // Get the initial values of the vacation to edit:
    useEffect(() => {
        const vacationId = +props.match.params.vacationId;
        // get data from the server
        axios.get<VacationModel>(Globals.adminUrl + vacationId, {
            headers: { //send token header
                'Authorization': `token ${store.getState().UserReducer.user.token}`
            }
        })
            .then(response => {
                const vacation = response.data;
                // set the dates in the correct format to display on the date picker
                fromDate = new Date(vacation.fromDate);
                fromDate.setDate(fromDate.getDate() + 1);
                fromDate = fromDate.toISOString().split('T')[0];
                toDate = new Date(vacation.toDate);
                toDate.setDate(toDate.getDate() + 1);
                toDate = toDate.toISOString().split('T')[0];

                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("fromDate", fromDate);
                setValue("toDate", toDate);
                setValue("price", vacation.price.toString());
            });
    }, []);


    async function sendData(vacation: VacationModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("destination", vacation.destination);
            myFormData.append("description", vacation.description);
            myFormData.append("fromDate", vacation.fromDate);
            myFormData.append("toDate", vacation.toDate);
            myFormData.append("price", vacation.price.toString());
            myFormData.append("image", vacation.image.item(0));
            // send the updated data to the server
            const response = await axios.patch<VacationModel>(Globals.adminUrl + props.match.params.vacationId, myFormData, {
                headers: { //send token header
                    'Authorization': `token ${store.getState().UserReducer.user.token}`
                }
            });

            // with redux:
            const action = { type: VacationsActionType.VacationUpdated, payload: response.data };
            store.dispatch(action); // update the vacations state
            alert(`Vacation to ${vacation.destination} has been successfully updated.`);
            props.history.push("/admin");
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("Something went wrong.");
        }
    }

    return (
        <div className="EditVacation">

            <Typography variant="h4" component="h4" color="primary">
                Edit Vacation
            </Typography>

            <form onSubmit={handleSubmit(sendData)}>

                <label>Destination:</label>
                <input type="text" name="destination" ref={register({ minLength: 2, maxLength: 50 })} />
                {errors.destination?.type === "minLength" && <span>Destination should have minimum 2 characters.</span>}
                {errors.destination?.type === "maxLength" && <span>Destination should have maximum 50 characters.</span>}
                <br /><br />

                <label>Description:</label>
                <textarea name="description" rows={5} ref={register({ minLength: 5, maxLength: 5000 })}></textarea>
                {errors.description?.type === "minLength" && <span>Description must have minimum 5 characters!</span>}
                {errors.description?.type === "maxLength" && <span>Description must have minimum 5 characters!</span>}
                <br /><br />

                <label>From:</label>
                <input type="date" defaultValue={fromDate} name="fromDate" ref={register} />
                <br /><br />

                <label>Until:</label>
                <input type="date" defaultValue={toDate} name="toDate" ref={register} />
                <br /><br />

                <label>Price:</label>
                <input type="number" step="0.01" name="price" ref={register({ min: 0 })} />
                {errors.price?.type === "min" && <span>Price can't be negative.</span>}
                <br /> <br />

                <label>Image:</label>
                <input type="file" name="image" accept="image/*" ref={register} />
                <br /> <br />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditVacation;
