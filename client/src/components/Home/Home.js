import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useLocation } from "react-router";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import { fetchPosts } from "../../actions/posts";
// we can name useStyles alias directly since it comes from a default export
import useStyles from "./styles";

function Home() {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    // dispatch is a function of Redux store to trigger state changes
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [currentId, dispatch, location]);

    return (
        <Grow in>
            <Container>
                <Grid
                    className={classes.mainContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
