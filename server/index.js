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

// To parse the incoming requests with JSON payloads, but we need to limit 30mb of data for images sent to the server
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// add a prefix of /posts to all routes in postRoutes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello to Story Time API");
});

// connect to MongoDB
mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error));
