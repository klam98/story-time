import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        mediaFile: "",
    });

    // grab the state of the post to be updated by comparing each post._id to currentId
    const postToBeUpdated = useSelector((state) =>
        currentId ? state.posts.find((post) => post._id === currentId) : null
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    // change the state of the form whenever there exists a post to be updated
    // which occurs when the edit button is selected for any given post
    useEffect(() => {
        if (postToBeUpdated) {
            setPostData(postToBeUpdated);
        }
    }, [postToBeUpdated]);

    const clearForm = () => {
        // need to clear the currentId and overwrite the form state
        setCurrentId(0);
        setPostData({
            title: "",
            message: "",
            tags: "",
            mediaFile: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        // form should be cleared once a post is created/updated
        clearForm();
    };

    // check if user is logged in or not to decide if they can make a post
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memorable stories and like other people's
                    stories.
                </Typography>
            </Paper>
        );
    }

    return (
        // Paper is essentially a div with a white background
        <Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                // require the root styling for margins between TextFields in the form
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? "Editing your story" : "Share a story"}
                </Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (comma-separated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.trim().split(","),
                        })
                    }
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        // convert image data into base64
                        onDone={({ base64 }) => setPostData({ ...postData, mediaFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clearForm}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
