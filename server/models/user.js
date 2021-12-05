import mongoose from "mongoose";

// set up the schema for users so we can store user information on DB
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
});

export default mongoose.model("User", userSchema);
