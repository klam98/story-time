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
    gridContainer: {
        padding: "0 16px",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse",
        },
    },
}));
