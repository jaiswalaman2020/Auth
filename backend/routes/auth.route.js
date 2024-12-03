import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  signup,
  logout,
  login,
  verifyEmail,
  forgetPassword,
  resetPasssword,
  checkAuth,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPasssword);
export default router;
