import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem("profile"));

    const handleClick = async () => {
        // get the user's name and comment after they submit the comment
        const commentToBeAdded = `${user.result.name}: ${comment}`;

        // make handle click async to allow for the new comment to be posted
        const newComments = await dispatch(commentPost(commentToBeAdded, post._id));

        // then change the state of comments to the updated comment array on the backend
        setComments(newComments);
        // clear out the user's text field after their comment has been submitted
        setComment("");

        // useRef is used just to auto-scroll to the end of the posted comments when the user posts a new comment
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments:
                    </Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{comment.split(":")[0] + ":"}</strong>
                            {comment.split(":")[1]}
                        </Typography>
                    ))}
                    {/* self-closing div acts as an anchor point for auto-scrolling to the end of the comments */}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name ? (
                    <div style={{ width: "50%" }}>
                        <Typography gutterBottom variant="h6">
                            Add a Comment:
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!comment}
                            variant="contained"
                            onClick={handleClick}
                            color="primary"
                        >
                            Comment
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CommentSection;
