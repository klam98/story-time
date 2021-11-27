import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { fetchPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import storytime from "./images/storytime.png";
// we can name useStyles alias directly since it comes from a default export
import useStyles from "./styles";

const App = () => {
    const classes = useStyles();
    // dispatch is a function of Redux store to trigger state changes
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
            >
                <Typography
                    className={classes.heading}
                    variant="h2"
                    align="center"
                >
                    Story Time
                </Typography>
                <img
                    className={classes.image}
                    src={storytime}
                    alt="storytime"
                    height="60"
                />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="stretch"
                        spacing={3}
                    >
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;
