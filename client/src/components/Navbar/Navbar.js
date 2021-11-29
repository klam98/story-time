import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import storytime from "../../assets/storytime.png";

function Navbar() {
    const classes = useStyles();
    const user = null;

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
                <img
                    className={classes.image}
                    src={storytime}
                    alt="storytime"
                    height="60"
                />
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
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    // else display login button and link to authorization
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
