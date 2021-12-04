import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Post from "./Post/Post";
import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    const query = useQuery();
    const searchQuery = query.get("searchQuery");
    let tagsQuery = query.get("tags");

    if (!posts.length && !isLoading) {
        if (!tagsQuery) {
            tagsQuery = "none";
        }

        return (
            <Typography className={classes.notifyUserText} variant="h4">
                {`No stories found with story title: "${searchQuery}" or with tags: "${tagsQuery}".`}
            </Typography>
        );
    }

    return (
        // if there are no posts, displaying the loading spinner
        isLoading ? (
            <Grid>
                <CircularProgress />
                <Typography className={classes.notifyUserText} variant="h5">
                    Loading stories... please wait.
                </Typography>
            </Grid>
        ) : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;
