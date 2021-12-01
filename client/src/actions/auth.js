import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        // fetching posts from API and then dispatching it through the action payload for the reducer to handle
        // dispatch({ type: AUTH, payload: data });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        // dispatch({ type: AUTH, payload: data });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
