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

    if (
      comment.user._id.toString() !== req.user.id &&
      !req.user.userRole === "ADMIN"
    ) {
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

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    console.log(comment);

    if (
      comment.user._id.toString() !== req.user.id &&
      !req.user.userRole === "ADMIN"
    ) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json(successHandler(200, "Comment has been deleted"));
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  if (!req.user.userRole === "ADMIN") {
    return next(errorHandler(403, "Your are not allowed to see all the comments"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    let comments = await Comment.find()
      .populate("user", "username")
      .populate("post", "title")
      .sort({
        createdAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

      
    res
      .status(200)
      .json(successHandler(200, "Comments retrived successfully", {comments,totalComments,lastMonthComments}));
  } catch (error) {
    next(error);
  }
};