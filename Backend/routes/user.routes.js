import express from "express";
import { register, login, sendVerificationOTP, verifyOTP } from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-verification-otp", sendVerificationOTP);
router.post("/verify-otp", verifyOTP);

export default router;
