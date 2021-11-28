import express from "express";
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/postMethods.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// patch is used for updating existing documents
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
