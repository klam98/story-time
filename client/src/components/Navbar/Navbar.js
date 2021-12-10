import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_deocde from "jwt-decode";

import useStyles from "./styles";
import githubIcon from "../../assets/github-bigger.png";
import storytime2 from "../../assets/storytime-logo2.png";
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
        window.location.reload();
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
            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={storytime2} alt="storytime" height="70" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    // if user is logged in display relevant info and logout button
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.initials}
                            alt={user?.result.name}
                            src={user?.result.imageUrl}
                        >
                            {/* get first letter of first name and first letter of last name */}
                            {user?.result.name.charAt(0) + user?.result.name.split(" ")[1][0]}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user?.result.name}
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className={classes.profile2}>
                        <Button
                            className={classes.github}
                            variant="contained"
                            href="https://github.com/klam98/story-time"
                            startIcon={<Avatar className={classes.githubIcon} src={githubIcon} />}
                            target="blank"
                        >
                            View Source Code
                        </Button>
                        {/* // else display login button and link to authorization */}
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            Sign in
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
