import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    // essentially media queries in styled js components
    // MUI's break point for "sm" is 600px as defined: https://mui.com/customization/breakpoints
    [theme.breakpoints.down("sm")]: {
        mainContainer: {
            flexDirection: "column-reverse",
        },
    },
}));
