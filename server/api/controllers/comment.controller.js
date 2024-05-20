import { errorHandler, successHandler } from "../utils/response.js";
import Comment from "../models/comment.model.js";

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
      postId,
      userId,
    });

    await newComment.save();

    res
      .status(200)
      .json(successHandler(200, "Comment added successfully", newComment));
  } catch (error) {
    next(error);
  }
};
