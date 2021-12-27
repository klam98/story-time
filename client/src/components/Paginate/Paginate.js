import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { getPosts } from "../../actions/posts";

const Paginate = ({ page, sort }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        // anytime a page changes, check if the page exists and if it does, fetch posts for it
        // if the sort order is changed too, rerender the fetched posts
        if (page) {
            dispatch(getPosts(page, sort));
        }
    }, [dispatch, page, sort]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            // render '1' if we do not have the number of pages
            page={Number(page) || 1}
            sort={sort}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}&sort=${sort}`}
                />
            )}
        />
    );
};

export default Paginate;
