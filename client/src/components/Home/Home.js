import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Container,
    Grow,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Typography,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate/Paginate";
import { getPosts, getPostsBySearch } from "../../actions/posts";
// we can name useStyles alias directly since it comes from a default export
import useStyles from "./styles";
import { RESET_POST_STATE } from "../../constants/actionTypes";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    // dispatch is a function of Redux store to trigger state changes
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const query = useQuery();
    const page = query.get("page") || 1;
    const sort = query.get("sort") || "newest";
    const searchQuery = query.get("searchQuery");

    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [sortType, setSortType] = useState("newest");

    const searchPost = () => {
        if (search.trim() || tags) {
            // join allows for tags: [foo, bar] => "foo,bar"
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        } else {
            navigate("/");
        }
    };

    const sortPosts = () => {
        // don't need to dispatch getPosts() here since after navigating, Home will call Paginate
        // which will then render page 1 in the desired sorted order
        navigate(`/posts?page=1&sort=${sortType}`);
    };

    const handleKeyPress = (e) => {
        // keycode 13 is the enter key
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (tagToDelete) => {
        // remove tagToDelete from tags
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    // reset the saved post state when clicking back on the homepage since we do not want that post
    // to be rerendered when clicking on a different post
    useEffect(() => {
        dispatch({ type: RESET_POST_STATE });
    }, [dispatch, location]);

    // reset the selected sorting type to the currently used sorting if user changes pages
    // but did not actually click the sort button to switch the sorting
    useEffect(() => {
        setSortType(sort);
    }, [page]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Stories"
                                onKeyDown={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={(tag) => handleAdd(tag)}
                                onDelete={(tagToDelete) => handleDelete(tagToDelete)}
                                label="Search Tags (press enter)"
                                variant="outlined"
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>

                        <AppBar className={classes.appBarSort} position="static" color="inherit">
                            <Paper className={classes.sortPosts} elevation={0}>
                                <FormControl fullWidth>
                                    <InputLabel>Sorting stories by:</InputLabel>
                                    <Select
                                        name="sort"
                                        label="Sort Stories"
                                        value={sortType}
                                        onChange={(e) => setSortType(e.target.value)}
                                    >
                                        <MenuItem
                                            className={classes.sortingOption}
                                            value={"newest"}
                                        >
                                            Newest
                                        </MenuItem>
                                        <MenuItem
                                            className={classes.sortingOption}
                                            value={"oldest"}
                                        >
                                            Oldest
                                        </MenuItem>
                                        <MenuItem
                                            className={classes.sortingOption}
                                            value={"mostLiked"}
                                        >
                                            Most Liked
                                        </MenuItem>
                                        <MenuItem
                                            className={classes.sortingOption}
                                            value={"leastLiked"}
                                        >
                                            Least Liked
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                            <Button
                                onClick={sortPosts}
                                className={classes.sortButton}
                                variant="contained"
                                color="primary"
                            >
                                Sort
                            </Button>
                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {/* don't show pagination if the user is searching for stories via query */}
                        {!searchQuery && !tags.length && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page} sort={sort} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
