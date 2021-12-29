import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../actions/posts";
import placeHolderImage from "../../assets/no-image-placeholder.png";
import CommentSection from "./CommentSection";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        // update the singular getPost each time the post id is changed
        dispatch(getPost(id));
    }, [dispatch, id]);

    // useEffect for recommending similar posts by the tags they share, updates when you open a new post
    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
        }
    }, [dispatch, post]);

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

    // cannot have the current post you are on being recommended to you
    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => {
        navigate(`/posts/${_id}`);
    };

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
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className={classes.typoMargin}
                    >
                        {post.message}
                    </Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <CommentSection post={post} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={post.mediaFile || placeHolderImage}
                        alt={post.title}
                    />
                </div>
            </div>
            {recommendedPosts.length ? (
                <div className={classes.section}>
                    <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
                        Similar stories you may also like:
                    </Typography>
                    <Divider />
                    <Grid
                        className={classes.recommendedPosts}
                        container
                        alignItems="stretch"
                        spacing={3}
                    >
                        {recommendedPosts.map(({ title, message, name, likes, mediaFile, _id }) => (
                            <Grid
                                className={classes.similarStories}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={3}
                                style={{ marginTop: "20px", cursor: "pointer" }}
                                onClick={() => openPost(_id)}
                                key={_id}
                            >
                                <Typography gutterBottom variant="h6">
                                    {title}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    {name}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="p">
                                    {message.split(" ").splice(0, 20).join(" ")}...
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    Likes: {likes.length}
                                </Typography>
                                <img src={mediaFile} width="250px" />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}
        </Paper>
    );
};

export default PostDetails;
