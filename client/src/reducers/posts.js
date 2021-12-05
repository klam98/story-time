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

// reducer is used to change the state of store data to allow for rerendering depending on the action passed
const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case STOP_LOADING:
            return { ...state, isLoading: false };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload.post,
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
            };
        case CREATE:
            // return all of the persisted posts + the newly created post
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
        case COMMENT:
            // if some post id from posts matches the post id from the data (payload), changed just the updated post
            // update, like, and comment all follow the same implementation for its reducer
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};

export default postsReducer;
