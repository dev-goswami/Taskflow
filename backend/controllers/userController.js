import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// register User

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            message: "Already a user",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dbUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(dbUser._id);

    return res.status(201).json({
        _id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        token,
    });
};

// Login User

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const dbUser = await User.findOne({ email });

    if (!dbUser) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    const isMatch = await bcrypt.compare(password, dbUser.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }
    const token = generateToken(dbUser._id);

    return res.status(200).json({
        _id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        token,
    });
};

export { registerUser, loginUser };
