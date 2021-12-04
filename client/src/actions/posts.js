// import everything from api since we'll be making a lot of calls exported from the api
import * as api from "../api/index";
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, LIKE, DELETE } from "../constants/actionTypes";

// Action Creators: functions that return an action
// action: object with a type and payload
// since we are working with Redux thunk and async logic, we have to use async/await and dispatch actions
export const getPosts = (page) => async (dispatch) => {
    try {
        // fetching posts from API and then dispatching it through the action payload for the reducer to handle
        const { data } = await api.getPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        // need to destructure data twice here, first for the axios request
        // second because we returned data as a json object from the backend
        const {
            data: { data },
        } = await api.getPostsBySearch(searchQuery.search, searchQuery.tags);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
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
