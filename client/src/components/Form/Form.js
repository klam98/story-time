import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: [],
        mediaFile: "",
    });
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    // grab the state of the post to be updated by comparing each post._id to currentId
    const postToBeUpdated = useSelector((state) =>
        currentId ? state.posts.posts.find((post) => post._id === currentId) : null
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        setIsFormInvalid(false);
        setPostData({
            title: "",
            message: "",
            tags: [],
            mediaFile: "",
        });
    };

    const validateForm = (postData) => {
        if (postData.title === "" || postData.message === "") {
            setIsFormInvalid(true);
            return true;
        } else {
            setIsFormInvalid(false);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // form is valid since the useState is: isFormInvalid
        if (!validateForm(postData)) {
            if (currentId) {
                dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
                clearForm();
            } else {
                dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
                clearForm();
            }
        }
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                900, // maxWidth
                500, // maxHeight
                "JPEG", // compressFormat
                100, // quality; if no compress is needed, just set it to 100
                0, // rotation; if no rotation is needed, just set it to 0
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            setPostData({ ...postData, mediaFile: image });
        } catch (error) {
            console.log(error);
        }
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

    const handleAdd = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleDelete = (tagToDelete) => {
        // remove tagToDelete from tags
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete) });
    };

    return (
        // Paper is essentially a div with a white background
        <Paper className={classes.paper} elevation={6}>
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
                    error={isFormInvalid && postData.title === ""}
                    helperText={isFormInvalid && postData.title === "" && "Title cannot be empty."}
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    error={isFormInvalid && postData.message === ""}
                    helperText={
                        isFormInvalid && postData.message === "" && "Message cannot be empty."
                    }
                    fullWidth
                    multiline
                    rows={8}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <ChipInput
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    className={classes.chip}
                    value={postData.tags}
                    // remove white spaces between words of the entered tag
                    onAdd={(tag) => handleAdd(tag.replace(/\s/g, ""))}
                    onDelete={(tagToDelete) => handleDelete(tagToDelete)}
                />
                <div className={classes.fileInput}>
                    <input
                        type="file"
                        multiple={false}
                        accept="image/*"
                        onChange={handleImageUpload}
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
