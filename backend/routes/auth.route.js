import express from "express";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  signup,
  logout,
  login,
  verifyEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import passport from "passport";

dotenv.config({ path: "../.env" });

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

export default router;
