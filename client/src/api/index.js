import axios from "axios";

// production url
const API = axios.create({ baseURL: "https://story-time-blog.herokuapp.com" });

// dev/testing url
// const API = axios.create({ baseURL: "http://localhost:5000" });

// have to send token back to our server and middleware to verify if the user is logged in
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

// posts
export const getPost = (id) => API.get(`/posts/${id}`);
export const getPosts = (page, sort) => API.get(`/posts?page=${page}&sort=${sort}`);
export const getPostsBySearch = (search, tags) => {
    // user searchQuery to grab the search term along with any given tags
    return API.get(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
};
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment });

// auth
export const signUp = (formData) => API.post("/users/signUp", formData);
export const signIn = (formData) => API.post("/users/signIn", formData);
