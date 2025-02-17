import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed. Please try again." });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.password === req.body.password) {
      const token = generateToken({ user: user.toJSON() });
      return res.status(200).send({
        data: { access_token: token },
        message: "Successfully logged in",
      });
    } else {
      return res.status(401).send({ message: "Invalid password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to login" });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res.status(201).send({ data: user, message: "Successfully fetched current user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const authController = {
  signup,
  login,
  init,
};
