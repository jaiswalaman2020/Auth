import dotenv from "dotenv";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Google } from "../models/google.model.js";
import { generateTokenAndSetCookie } from "../utils/ generateTokenAndSetCookie.js";
import {
  sendVerifactionEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetSuccessfulEmail,
} from "../mailtrap/emails.js";
import path from "path";
dotenv.config({ path: "../.env" });
// console.log(process.env.CLIENT_URL);
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (!userExists.isVerified) {
        throw new Error(
          "User already exists but not verified. Please verify your account."
        );
      }
      throw new Error("User already exists");
    }

    // Generate verification token first
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Send verification email before creating user
    await sendVerifactionEmail(email, verificationToken);

    // Store token temporarily
    req.session.tempUser = {
      email,
      password,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    res.status(200).json({
      success: true,
      message: "Verification email sent. Please verify your email.",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const tempUser = req.session.tempUser;
    if (!tempUser) {
      return res.status(400).json({
        success: false,
        message: "Verification session expired. Please sign up again.",
      });
    }

    if (
      tempUser.verificationToken !== code ||
      tempUser.verificationTokenExpiresAt < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Hash password after successful verification
    const hashpassword = await bcrypt.hash(tempUser.password, 10);

    const existingUser = await User.findOne({ email: tempUser.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please log in.",
      });
    }

    const user = new User({
      email: tempUser.email,
      password: hashpassword,
      name: tempUser.name,
      isVerified: true,
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);

    await sendWelcomeEmail(user.email, user.name);

    delete req.session.tempUser;

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !password) {
      return res
        .status(400)
        .json({ success: false, message: "provide email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to log out" });
    }

    // Clear the JWT cookie
    res.clearCookie("token");
    res.clearCookie("connect.sid"); // Clear the session cookie

    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    //genrate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    await user.save();

    //send email
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset password token",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    user.password = hashpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetSuccessfulEmail(user.email);
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  let user;
  if (req.userType === "google") {
    user = await Google.findById(req.userId);
  } else {
    user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }
  }

  res.status(200).json({
    success: true,
    user: {
      ...user._doc,
    },
  });
};
