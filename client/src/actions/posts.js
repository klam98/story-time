// import everything from api since we'll be making a lot of calls exported from the api
import * as api from "../api/index";
import {
    FETCH_POST,
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    LIKE,
    COMMENT,
    DELETE,
    START_LOADING,
    STOP_LOADING,
} from "../constants/actionTypes";

// Action Creators: functions that return an action
// action: object with a type and payload
// since we are working with Redux thunk and async logic, we have to use async/await and dispatch actions
export const getPost = (id) => async (dispatch) => {
    try {
        // need a way to communicate with reducers of when to start and stop loading fetch request
        dispatch({ type: START_LOADING });

        // fetching posts from API and then dispatching it through the action payload for the reducer to handle
        const { data } = await api.getPost(id);
        dispatch({ type: FETCH_POST, payload: { post: data } });

        dispatch({ type: STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = (page, sort) => async (dispatch) => {
    try {
        // need a way to communicate with reducers of when to start and stop loading fetch request
        dispatch({ type: START_LOADING });

        // fetching posts from API and then dispatching it through the action payload for the reducer to handle
        const {
            data: { data, currentPage, numberOfPages },
        } = await api.getPosts(page, sort);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });

        dispatch({ type: STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        // need to destructure data twice here, first for the axios request
        // second because we returned data as a json object from the backend
        const {
            data: { data },
        } = await api.getPostsBySearch(searchQuery.search, searchQuery.tags);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });

        dispatch({ type: STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });

        navigate(`/posts/${data._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        // no need for result here as { data } since we are just deleting a post
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id);
        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};
