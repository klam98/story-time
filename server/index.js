import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
export const AUTH_SECRET = process.env.AUTH_SECRET;

// To parse the incoming requests with JSON payloads, but we need to limit 30mb of data for images sent to the server
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000", "https://story-time-web.netlify.app"],
    })
);

// add a prefix of /posts to all routes in postRoutes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Story Time API");
});

// connect to MongoDB
mongoose
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log("Error connecting to MongoDB: ", error.message));
