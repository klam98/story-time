import React from "react";
import {
    Card,
    CardActions,
    ButtonBase,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import placeHolderImage from "../../../assets/no-image-placeholder.png";
import { deletePost, likePost } from "../../../actions/posts";

// pass in destructured post as props
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));

    // Likes component necessary for handling 'Like' grammar on each post
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?._id)
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        );
    };

    const openPostDetails = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPostDetails}>
                <CardMedia
                    className={classes.media}
                    image={post.mediaFile || placeHolderImage}
                    title={post.title}
                />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {/* only show edit button if user's google/jwt id matches post id */}
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button
                            style={{ color: "white" }}
                            size="small"
                            onClick={() => setCurrentId(post._id)}
                        >
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {/* map every tag in a post prepending them with a '#' and appending them with a space
                        e.g. tags=food,eating => #food #eating similar to real social media apps.
                        Only preprend non-empty strings */}
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    // disable liking if you are not logged in
                    disabled={!user?.result}
                    onClick={() => dispatch(likePost(post._id))}
                >
                    <Likes />
                </Button>
                {/* only show delete button if user's google/jwt id matches post id */}
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(deletePost(post._id))}
                    >
                        <DeleteIcon fontSize="small" />
                        &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
