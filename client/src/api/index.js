import axios from "axios";

// production url
// const API = axios.create({ baseURL: "https://story-time-blog.herokuapp.com" });

// dev/testing url
const API = axios.create({ baseURL: "http://localhost:5000" });

// have to send token back to our server and middleware to verify if the user is logged in
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

// posts
export const getPosts = () => API.get("/posts");
export const getPostsBySearch = (searchQuery) => {
    // user searchQuery to grab the search term along with any given tags
    API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
};
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// users
export const signUp = (formData) => API.post("/users/signUp", formData);
export const signIn = (formData) => API.post("/users/signIn", formData);
