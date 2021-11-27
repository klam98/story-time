// reducer is used to change the state of store data to allow for rerendering depending on the action passed
const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            // return all of the persisted posts + the newly created post
            return [...posts, action.payload];
        default:
            return posts;
    }
};

export default postsReducer;
