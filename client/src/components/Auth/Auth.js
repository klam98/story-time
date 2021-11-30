import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
    TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";
import Input from "./Input";

function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const classes = useStyles();

    const handleSubmit = () => {};

    const handleChange = () => {};

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignedIn((prevIsSignedIn) => !prevIsSignedIn);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
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
                            <Grid container justify="flex-end">
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
