import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    heading: {
        color: "rgba(25, 25, 25, 1)",
        textDecoration: "none",
    },
    image: {
        marginLeft: "15px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        width: "400px",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
        },
    },
    profile: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "350px",
        alignItems: "center",
    },
    userName: {
        display: "flex",
        alignItems: "center",
    },
    brandContainer: {
        display: "flex",
        alignItems: "center",
    },
    initials: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: "45px",
        height: "45px",
    },
    github: {
        color: "white",
        backgroundColor: "rgba(55, 55, 65, 1)",
        marginRight: "10px",
        "&:hover": {
            backgroundColor: "rgb(25, 25, 25, 1)",
        },
    },
    githubIcon: {
        width: "25px",
        height: "25px",
    },
}));
