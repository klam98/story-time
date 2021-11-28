import PostMesage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        // looking for postMessages that match the PostMessage schema mongoose model
        const postMessages = await PostMesage.find();
        res.status(200).json(postMessages); // 200 is OK
    } catch (error) {
        res.status(404).json({ message: error.message }); // 404 is NOT FOUND
    }
};

export const createPost = async (req, res) => {
    // post's req.body will be grabbed from the client side via a form and then its contents will create a new PostMessage object
    const post = req.body;
    const newPost = new PostMesage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost); // 201 is CREATED
    } catch (error) {
        res.status(409).json({ message: error.message }); // 409 is CONFLICT
    }
};

export const updatePost = async (req, res) => {
    // extract the post id from the req
    const { id: _id } = req.params;
    // post body received from the front end
    const post = req.body;

    // check if the post id is valid and exists in MongoDB
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No posts found with id: ${_id}`);
    }

    // update the post object on MongoDB
    const updatedPost = await PostMesage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        { new: true }
    );

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    // extract the post id from the req
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No posts found with id: ${id}`);
    }

    // delete post object from MongoDB
    await PostMesage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
    // extract the post id from the req
    const { id } = req.params;

    // check if the post id is valid and exists in MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No posts found with id: ${id}`);
    }

    const updatedPost = await PostMesage.findByIdAndUpdate(
        id,
        // increment likeCount by 1
        { $inc: { likeCount: 1 } },
        { new: true }
    );

    res.json(updatedPost);
};
