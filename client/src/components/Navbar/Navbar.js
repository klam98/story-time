import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_deocde from "jwt-decode";

import useStyles from "./styles";
import storytime from "../../assets/storytime.png";
import { LOGOUT } from "../../constants/actionTypes";

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate("/");

        // need to set user to null after logging out
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        // check if token exists and whether its expired
        if (token) {
            const decodedToken = jwt_deocde(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        // when location changes, updated the user e.g. when you sign in and are redirected to the homepage
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

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
                            className={classes.initials}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {/* get first letter of first name and first letter of last name */}
                            {user.result.name.charAt(0) + user.result.name.split(" ")[1][0]}
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
