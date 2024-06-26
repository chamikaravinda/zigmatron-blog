import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/get", getPosts);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);

export default router;
