import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    media: {
        borderRadius: "20px",
        objectFit: "cover",
        width: "100%",
        maxHeight: "500px",
    },
    card: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            flexDirection: "column",
        },
    },
    section: {
        borderRadius: "20px",
        margin: "10px",
        flex: 1,
    },
    imageSection: {
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0px",
            marginTop: "20px",
        },
    },
    recommendedPosts: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    loadingPaper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        height: "39vh",
    },
    commentsOuterContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    commentsInnerContainer: {
        height: "230px",
        overflowY: "auto", // makes the div scrollable for the comments
        marginRight: "30px",
    },
    similarStories: {
        padding: "5px",
        borderRadius: "10px",
        "&:hover": {
            backgroundColor: "rgb(225, 225, 225, 0.75)",
        },
    },
    typoMargin: {
        marginBottom: "20px",
    },
}));
