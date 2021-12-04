import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { getPost } from "../../actions/posts";
import placeHolderImage from "../../assets/no-image-placeholder.png";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        // update the singular getPost each time the post id is changed
        dispatch(getPost(id));
    }, [id]);

    // check if there are no posts before it tries to render them
    if (!post) {
        return null;
    }

    if (isLoading) {
        return (
            <Paper className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <Typography variant="body1">
                        <strong>Comments - coming soon!</strong>
                    </Typography>
                    <Divider style={{ margin: "20px 0" }} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={post.mediaFile || placeHolderImage}
                        alt={post.title}
                    />
                </div>
            </div>
        </Paper>
    );
};

export default PostDetails;
