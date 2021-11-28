import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        color: "rgba(25, 25, 25, 1)",
    },
    image: {
        marginLeft: "15px",
    },
    // essentially media queries in styled js components
    // MUI's break point for "sm" is 600px as defined: https://mui.com/customization/breakpoints
    [theme.breakpoints.down("sm")]: {
        mainContainer: {
            flexDirection: "column-reverse",
        },
    },
}));
