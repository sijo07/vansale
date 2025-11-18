import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Admin signup (first-time only)
export const adminSignup = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const { name, email, password } = req.body;
    const admin = await User.create({ name, email, password, role: "admin" });
    res.status(201).json({ token: generateToken(admin._id), admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login (admin or user)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id), user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
