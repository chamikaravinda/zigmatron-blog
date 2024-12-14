import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/get", getPosts);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);
router.put("/update/:postId/:userId", verifyToken, updatePost);

export default router;
