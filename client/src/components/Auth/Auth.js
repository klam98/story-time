import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";

function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const handleSubmit = () => {};

    const handleChange = () => {};

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignedIn((prevIsSignedIn) => !prevIsSignedIn);
    };

    const googleSuccess = async (res) => {
        // optional chaining operator '?' does not cause an error is res is not found but just sends a warning
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later.");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className={classes.h5} variant="h5">
                    {isSignedIn ? "Sign Up" : "Sign In"}
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignedIn && (
                                <>
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        onChange={handleChange}
                                        autoFocus
                                        half
                                    />

                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        onChange={handleChange}
                                        half
                                    />
                                </>
                            )}
                            <Input
                                name="email"
                                label="Email Address"
                                handleChange={handleChange}
                                type="email"
                            />
                            {/* we need a state here to swap between password and showing password text */}
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                            {isSignedIn && (
                                <Input
                                    name="confirmPassword"
                                    label="Repeat Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {isSignedIn ? "Sign Up" : "Sign In"}
                            </Button>
                            <GoogleLogin
                                clientId="1009978888626-4ua4lhopi7ftr0cvrsgohn1b826uimp1.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <Button
                                        className={classes.googleButton}
                                        color="primary"
                                        fullWidth
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        startIcon={<Icon />}
                                        variant="contained"
                                    >
                                        Google Sign In
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                            <Grid container justifyContent="flex-end">
                                <Button onClick={switchMode}>
                                    {isSignedIn
                                        ? "Already have an account? Sign In"
                                        : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Auth;
