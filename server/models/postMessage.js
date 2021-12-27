import mongoose from "mongoose";

// set up the schema for posts
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    mediaFile: String,
    likes: {
        type: [String],
        default: [],
    },
    numLikes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

// exporting mongoose model from postMessage, so we can later use commands such as find, create, delete, update etc.
export default PostMessage;
