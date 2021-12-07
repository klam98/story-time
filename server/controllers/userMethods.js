import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // check if email exist before making a new one
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: "User already exists." });
        }

        // check if user is submitting the correct password
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match, try again." });
        }

        // otherwise at this point, the sign up request should be valid
        // salt is the level of difficulty for hashing passwords, 12 is commonly used
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            "99705D41A3D6F8E184DB7DA2CC7CC1FB0FD853C893B899E83A02FEB8E7ABDC0E"
        );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." }); // 500 is an undefined server error
    }
};

export const signIn = async (req, res) => {
    // recall when you perform a post-request, you can grab data from req.body
    const { email, password } = req.body;

    try {
        // search for existing user by their email on the DB since we're signing in
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist." });
        }

        // check if password was incorrect/different from the password on DB
        // we need bcrypt compare since the passwords are hashed
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // otherwise at this point, the sign in request should be valid
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            "99705D41A3D6F8E184DB7DA2CC7CC1FB0FD853C893B899E83A02FEB8E7ABDC0E",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
