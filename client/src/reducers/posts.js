// reducer is used to change the state of store data to allow for rerendering depending on the action passed
const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            // return all of the persisted posts + the newly created post
            return [...posts, action.payload];
        case "UPDATE":
            // if some post id from posts matches the post id from the data (payload), return the updated post
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
        case "DELETE":
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};

export default postsReducer;
