import express from "express";
import { signUp, signIn } from "../controllers/userMethods.js";

const router = express.Router();

// sign-up is a post request because we are sending all information from log-in form to the server
router.post("/signUp", signUp);

router.post("/signIn", signIn);

export default router;
