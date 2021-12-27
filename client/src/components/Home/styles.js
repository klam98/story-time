import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: "1.5rem",
        display: "flex",
        padding: "16px",
    },
    pagination: {
        borderRadius: 4,
        marginTop: "1.5rem",
        padding: "16px",
    },
    appBarSort: {
        borderRadius: 4,
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        padding: "16px",
    },
    sortPosts: {
        borderRadius: 4,
        display: "flex",
        padding: "0px 0px 16px 0px",
    },
    sortingOption: {
        "&.Mui-selected": {
            backgroundColor: "#EDFDFF",
            border: "1px solid #007185",
        },
    },
    sortWarning: {
        color: "red",
        padding: "10px 0px 0px 0px",
    },
    gridContainer: {
        padding: "0 16px",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse",
        },
    },
}));
