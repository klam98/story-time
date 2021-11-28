import express from "express";
import {
    getPosts,
    createPost,
    updatePost,
} from "../controllers/postMethods.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// patch is used for updating existing documents
router.patch("/:id", updatePost);

export default router;
