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
      post: postId,
      user: userId,
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

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res
      .status(200)
      .json(successHandler(200, "Like updated successfully", comment));
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (comment.user._id.toString() !== req.user.id && !req.user.userRole === "ADMIN") {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }


    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res
      .status(200)
      .json(successHandler(200, "Comment updated successfully", editComment));
  } catch (error) {
    next(error);
  }
};
