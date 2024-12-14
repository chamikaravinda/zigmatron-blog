import {
  dispatchError,
  dispatchSuccess,
  dispatchStartLoading,
} from "./notifications.action";

export const createComment = (comment, success) => {
  dispatchStartLoading(null);
  fetch("/api/comment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchSuccess("Comment added Successfully");
      success(payload.data.slug);
    });
};

export const getPostComments = async (postId, success) => {
  await fetch(`/api/comment/get-comments/${postId}`)
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      success(payload.data);
    });
};

export const toggleLike = async (commentId, success) => {
  await fetch(`/api/comment/like-comment/${commentId}`, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      success();
    });
};

export const editComment = (comment, success) => {
  dispatchStartLoading(null);
  fetch(`/api/comment/edit-comment/${comment._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment.content,
    }),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchSuccess("Comment edited Successfully");
      success();
    });
};

export const deleteComment = (commentId, success) => {
  dispatchStartLoading(null);
  fetch(`/api/comment/delete-comment/${commentId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchSuccess("Comment deleted Successfully");
      success();
    });
};

export const getComments = async (startIndex, success) => {
  await fetch(`/api/comment/get-comments?startIndex=${startIndex}`)
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      success(payload.data);
    });
};