import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import "./Header.css";
import WelcomeUser from '../../UsersArea/WelcomeUser/WelcomeUser';


function Header(): JSX.Element {
    // tool bar
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            Button: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );
    const classes = useStyles();

    return (
        <div className="Header">
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit"><NavLink className="Link" to="/vacations" exact>Vacations</NavLink></Button>
                        <Button color="inherit"><NavLink className="Link" to="/about" exact>About</NavLink></Button>
                        <Button color="inherit"><NavLink className="Link" to="/login" exact>Login</NavLink></Button>

                        <Typography variant="h4" className={classes.title}>
                            VACATIONSGRAM
                        </Typography>

                    
                        <WelcomeUser />
                        {/* <Button color="inherit"><NavLink className="Link" to="/admin" exact>Admin</NavLink></Button> */}
                       


                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
}


export default Header;