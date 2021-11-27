import PostMesage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        // looking for postMessages that match the PostMessage schema mongoose model
        const postMessages = await PostMesage.find();
        res.status(200).json(postMessages); // 200 is OK
    } catch (error) {
        res.status(404).json({ message: error.message }); // 404 is NOT FOUND
    }
};

export const createPosts = async (req, res) => {
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
