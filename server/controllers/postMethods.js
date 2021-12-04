import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        // looking for postMessages that match the PostMessage schema mongoose model
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// QUERY -> /search?page=1 -> page = 1
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        // RegEx 'i' means ignore upper/lower-case
        const title = new RegExp(searchQuery, "i");

        // $or means find a post matching in either title, or tags
        // $in is used to look for any matching in the array of tags we generate by splitting on ","
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }],
        });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// PARAMS -> /posts/:id -> e.g. /posts/123 -> id=123
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const postMessages = await PostMessage.findById(id);
        res.status(200).json(postMessages); // 200 is OK
    } catch (error) {
        res.status(404).json({ message: error.message }); // 404 is NOT FOUND
    }
};

export const createPost = async (req, res) => {
    // post's req.body will be grabbed from the client side via a form and then its contents will create a new PostMessage object
    const post = req.body;
    // server can now specify which user id create any given post
    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

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
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    // extract the post id from the req
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No posts found with id: ${id}`);
    }

    // delete post object from MongoDB
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
    // extract the post id from the req
    const { id } = req.params;

    // check if user is authenticated
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    // check if the post id is valid and exists in MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No posts found with id: ${id}`);
    }

    const post = await PostMessage.findById(id);

    // we can use index to determine whether or not the user has already liked the post
    const index = post.likes.findIndex((id) => id === String(req.userId));
    // user has not yet liked the post
    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // unlike the post by filtering out the like from the user id
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    });

    res.json(updatedPost);
};
