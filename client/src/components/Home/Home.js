import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate/Paginate";
import { getPostsBySearch } from "../../actions/posts";
// we can name useStyles alias directly since it comes from a default export
import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    // dispatch is a function of Redux store to trigger state changes
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags) {
            // join allows for tags: [foo, bar] => "foo,bar"
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        } else {
            navigate("/");
        }
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
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {/* don't show pagination if the user is searching for stories via query */}
                        {!searchQuery && !tags.length && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
