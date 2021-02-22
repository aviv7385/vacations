import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/vacations" component={VacationsList} exact />
                <Redirect from="/" to="/home" exact />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
