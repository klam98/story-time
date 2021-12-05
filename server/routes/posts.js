import express from "express";
import {
    getPost,
    getPosts,
    getPostsBySearch,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from "../controllers/postMethods.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// defining endpoint for /:id before /search breaks for some reason, FIX when possible
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);

// note: after pagination, getPosts does not return all of the posts even on server side, but only posts at
// any set page e.g. http://localhost:3000/posts?page=1 will return getPosts() at page 1 and so forth
// basically: working as intended
router.get("/", getPosts);

// it makes sense for all users to getPosts, but you should be logged in to create your own post
// by callnig auth before a controller method, the method will then have access to populated data
// e.g. auth first grabs req.userId, createPost now has access to req.userId to perform additional logic
router.post("/", auth, createPost);

// patch is used for updating existing documents
router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

// need auth for liking posts so that each post can be only liked once by any given user id
router.patch("/:id/likePost", auth, likePost);

export default router;
