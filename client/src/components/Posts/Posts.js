import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        // if there are no posts, displaying the loading spinner
        !posts.length ? (
            <CircularProgress />
        ) : (
            <Grid
                className={classes.mainContainer}
                container
                alignItems="stretch"
                spacing={3}
            >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;
