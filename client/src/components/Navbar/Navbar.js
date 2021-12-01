import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import storytime from "../../assets/storytime.png";

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;

        // JWT for manual sign-up (soon)

        // when location changes, updated the user e.g. when you sign in and are redirected to the homepage
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");

        // need to set user to null after logging out
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    className={classes.heading}
                    variant="h2"
                    align="center"
                >
                    story time
                </Typography>
                <img className={classes.image} src={storytime} alt="storytime" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    // if user is logged in display relevant info and logout button
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button
                            className={classes.logout}
                            variant="contained"
                            color="secondary"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    // else display login button and link to authorization
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
