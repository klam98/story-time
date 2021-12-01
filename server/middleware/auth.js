import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        // after user is signed up/in we need to pass them permissions to do certain actions
        // token is in first position of the array after splitting
        const token = req.headers.authorization.split(" ")[1];
        // the token made using JWT is < 500
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "test");
            req.userId = decodedData?.id;
        } else {
            // working with Google OAuth token
            decodedData = jwt.decode(token);
            // sub is Google's name for a specific id which differentiates all Google users
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
