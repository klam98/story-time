import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
    media: {
        height: 0,
        paddingTop: "56.25%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
    },
    border: {
        border: "solid",
    },
    fullHeightCard: {
        height: "100%",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        "&:hover": {
            // backgroundColor: "rgb(48, 63, 159, 0.5)",
            // backgroundColor: "rgb(125, 125, 125, 0.7)",
            backgroundColor: "rgb(225, 225, 225, 0.75)",
        },
    },
    overlay: {
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
    },
    overlay2: {
        position: "absolute",
        top: "20px",
        right: "20px",
        color: "white",
    },
    grid: {
        display: "flex",
    },
    details: {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
    },
    title: {
        padding: "0 16px",
    },
    cardActions: {
        padding: "0 8px 8px 8px",
        display: "flex",
        justifyContent: "space-between",
    },
    cardAction: {
        display: "block",
        textAlign: "initial",
    },
    likeBtn: {
        "&:hover": {
            backgroundColor: "rgb(48, 63, 159, 0.3)",
        },
    },
    editBtn: {
        "&:hover": {
            // nice 8)
            backgroundColor: "rgb(69, 69, 69, 0.3)",
            color: "black",
        },
    },
    deleteBtn: {
        "&:hover": {
            backgroundColor: "rgb(200, 55, 55, 0.3)",
        },
    },
});
