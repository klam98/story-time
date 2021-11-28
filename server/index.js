import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

// To parse the incoming requests with JSON payloads, but we need to limit 30mb of data for images sent to the server
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// add a prefix of /posts to all routes in postRoutes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello to Story Time API");
});

const PORT = process.env.PORT || 5000;

// connect to MongoDB
mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));
