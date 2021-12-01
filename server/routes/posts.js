import express from "express";
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from "../controllers/postMethods.js";
import auth from "../middleware/auth.js";

const router = express.Router();

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
