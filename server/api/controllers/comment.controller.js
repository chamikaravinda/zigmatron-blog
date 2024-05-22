import { errorHandler, successHandler } from "../utils/response.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "Your are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      post:postId,
      user:userId,
    });

    await newComment.save();

    res
      .status(200)
      .json(successHandler(200, "Comment added successfully", newComment));
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    let comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username profilePicture")
      .sort({
        createdAt: -1,
      });

    res
      .status(200)
      .json(successHandler(200, "Comment retrived successfully", comments));
  } catch (error) {
    next(error);
  }
};
