import React, { useState } from "react";
import {
    Card,
    CardActions,
    ButtonBase,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide,
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
    // useState for likes for implementing responsive liking
    const [likes, setLikes] = useState(post?.likes);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const validUserId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === validUserId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== validUserId));
        } else {
            setLikes([...post.likes, validUserId]);
        }
    };

    const handleDelete = () => {
        setShowDeleteConfirm(false);
        dispatch(deletePost(post._id));
    };

    const handleClickOpen = () => {
        setShowDeleteConfirm(true);
    };

    const handleClose = () => {
        setShowDeleteConfirm(false);
    };

    // Likes component necessary for handling 'Like' grammar on each post
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === validUserId) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
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
                        {post.message.split(" ").splice(0, 20).join(" ")}...
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                {/* Like Button */}
                <Button
                    className={classes.likeBtn}
                    size="small"
                    color="primary"
                    // disable liking if you are not logged in
                    disabled={!user?.result}
                    onClick={handleLike}
                >
                    <Likes />
                </Button>

                {/* Edit Button */}
                {/* only show edit button if user's google/jwt id matches post id */}
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator ||
                    user?.result?._id === "61ad2edeaba411e38e5ebe58") && (
                    <Button
                        className={classes.editBtn}
                        size="small"
                        onClick={() => setCurrentId(post._id)}
                    >
                        <MoreHorizIcon fontSize="medium" />
                        Edit
                    </Button>
                )}

                {/* Delete Button */}
                {/* only show delete button if user's google/jwt id matches post id */}
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator ||
                    user?.result?._id === "61ad2edeaba411e38e5ebe58") && (
                    <Button
                        className={classes.deleteBtn}
                        size="small"
                        color="secondary"
                        onClick={handleClickOpen}
                    >
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
                <Dialog open={showDeleteConfirm} onClose={handleClose} TransitionComponent={Slide}>
                    <DialogContent>
                        <DialogContentText style={{ color: "black" }}>
                            Delete your post?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.deleteConfirm}>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
};

export default Post;
