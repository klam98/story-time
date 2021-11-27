// import everything from api since we'll be making a lot of calls exported from the api
import * as api from "../api";

// Action Creators: functions that return an action
// action: object with a type and payload
// since we are working with Redux thunk and async logic, we have to use async and dispatch actions
export const getPosts = () => async (dispatch) => {
    try {
        // fetching posts from API and then dispatching it through the action payload for the reducer to handle
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
