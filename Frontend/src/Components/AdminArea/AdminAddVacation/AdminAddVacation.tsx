import { Typography } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { History } from "history";
import store from "../../../Redux/Store";
import { Globals } from "../../../Services/Globals";
import VacationModel from "../../VacationsArea/models/VacationModel";
import "./AdminAddVacation.css";

// this component will allow the Admin to add a new vacation

interface AdminAddVacationProps {
    history: History;
}

function AdminAddVacation(props: AdminAddVacationProps): JSX.Element {

    // get today's date (for the default value of date-picker)
    const curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substr(0, 10);

    // create form
    const { register, handleSubmit, errors } = useForm<VacationModel>();

    async function sendData(vacation: VacationModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("destination", vacation.destination);
            myFormData.append("description", vacation.description);
            myFormData.append("fromDate", vacation.fromDate);
            myFormData.append("toDate", vacation.toDate);
            myFormData.append("price", vacation.price.toString());
            myFormData.append("image", vacation.image.item(0));
            // send data to the server
            const response = await axios.post<VacationModel>(Globals.adminUrl, myFormData, {
                headers: { //send token header
                    'Authorization': `token ${store.getState().UserReducer.user.token}`
                }
            });
            const addedVacation = response.data;

            alert(`Vacation to ${addedVacation.destination} has been successfully added.`);
            props.history.push("/admin");
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("Something went wrong.");
        }
    }

    return (
        <div className="AdminAddVacation">
            <Typography variant="h4" component="h4" color="primary">
                Add Vacation
            </Typography>

            <form onSubmit={handleSubmit(sendData)}>

                <label>Destination:</label>
                <input type="text" name="destination" ref={register({ required: true, minLength: 2, maxLength: 50 })} />
                {errors.destination?.type === "required" && <span>Must enter destination!</span>}
                {errors.destination?.type === "minLength" && <span>Destination should have minimum 2 characters.</span>}
                {errors.destination?.type === "maxLength" && <span>Destination should have maximum 50 characters.</span>}
                <br /><br />

                <label>Description:</label>
                <textarea name="description" rows={5} ref={register({ required: true, minLength: 5, maxLength: 5000 })}></textarea>
                {errors.description?.type === "required" && <span>Must enter description!</span>}
                {errors.description?.type === "minLength" && <span>Description must have minimum 5 characters!</span>}
                {errors.description?.type === "maxLength" && <span>Description must have minimum 5 characters!</span>}
                <br /><br />

                <label>From:</label>
                <input type="date" name="fromDate" min={date} ref={register({ required: true })} />
                <br /><br />

                <label>Until:</label>
                <input type="date" name="toDate" min={date} ref={register({ required: true })} />
                <br /><br />

                <label>Price:</label>
                <input type="number" step="0.01" name="price" ref={register({ required: true, min: 0 })} />
                {errors.price?.type === "required" && <span>Must enter price!</span>}
                {errors.price?.type === "min" && <span>Price can't be negative.</span>}
                <br /> <br />

                <label>Image:</label>
                <input type="file" name="image" accept="image/*" ref={register({ required: true })} />
                {errors.image && <span>Missing image.</span>}
                <br /> <br />

                <button>Add</button>

            </form>
        </div>

    );
}

export default AdminAddVacation;
