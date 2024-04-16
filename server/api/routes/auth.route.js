import express from "express";
import { signup, signIn, googleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/google-auth", googleAuth);

export default router;
