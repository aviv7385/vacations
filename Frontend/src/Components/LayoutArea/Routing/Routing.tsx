import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminAddVacation from "../../AdminArea/AdminAddVacation/AdminAddVacation";
import AdminVacationsList from "../../AdminArea/AdminVacationsList/AdminVacationsList";
import Login from "../../UsersArea/Login/Login";
import Register from "../../UsersArea/Register/Register";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";

function Routing(): JSX.Element {

    

    return (
        <div className="Routing">
			<Switch>
                <Route path="/vacations" component={VacationsList} exact />
                <Route path="/admin" component={AdminVacationsList} exact />
                <Route path="/admin/add-vacation" component={AdminAddVacation} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Redirect from="/" to="/vacations" exact />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
