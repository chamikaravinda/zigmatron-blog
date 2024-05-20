import {
  dispatchError,
  dispatchSuccess,
  dispatchStartLoading,
} from "./notifications.action";

export const createComment = (comment,success) => {
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
