import express from "express";
import {
  signup,
  logout,
  login,
  verifyEmail,
  forgetPassword,
  resetPasssword,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgetPassword", forgetPassword);
router.post("/forgetPassword/:token", resetPasssword);
export default router;
