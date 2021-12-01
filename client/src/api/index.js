import axios from "axios";

// production url
// const API = axios.create({ baseURL: "https://story-time-blog.herokuapp.com" });

// dev/testing url
const API = axios.create({ baseURL: "http://localhost:5000" });

// posts
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// users
export const signUp = (formData) => API.post("/users/signUp", formData);
export const signIn = (formData) => API.post("/users/signIn", formData);
