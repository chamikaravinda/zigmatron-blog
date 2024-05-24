import {
  dispatchClearNotifications,
  dispatchError,
  dispatchStopLoading,
  dispatchSuccess,
  dispatchStartLoading,
} from "./notifications.action";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";

export const uploadPostImage = async (
  imageFile,
  inProgress,
  failure,
  success
) => {
  dispatchClearNotifications();
  if (!imageFile) {
    dispatchError("Please select an image");
    return;
  }

  const storage = getStorage(app);
  const fileName = new Date().getTime() + "_" + imageFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      inProgress(progress);
    },
    () => {
      dispatchError("Unexpected Error occured");
      failure();
    },
    () => {
      dispatchStopLoading();
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        success(downloadURL);
      });
    }
  );
};

export const createPost = async (formData, success) => {
  dispatchStartLoading(null);
  fetch("/api/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchSuccess("Post created Successfully");
      success(payload.data.slug);
    });
};

export const getPost = async (postId, success) => {
  dispatchStartLoading();
  await fetch(`/api/posts/get?postId=${postId}`)
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchStopLoading();
      success(payload.data.posts[0]);
    });
};

export const getPostBySlug = async (slug, success) => {
  dispatchStartLoading();
  await fetch(`/api/posts/get?slug=${slug}`)
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchStopLoading();
      success(payload.data.posts[0]);
    })
    .catch((error) => {
      dispatchError(error);
    });
};

export const getPosts = async (userId, startIndex, success) => {
  dispatchStartLoading();
  await fetch(`/api/posts/get?userId=${userId}&startIndex=${startIndex}`)
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchStopLoading();
      success(payload.data.posts);
    });
};

export const updatePost = async (formData, currentUserId, success) => {
  dispatchStartLoading(null);
  fetch(`/api/posts/update/${formData._id}/${currentUserId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchSuccess("Post updated Successfully");
      success(payload.data.slug);
    });
};

export const deletePost = async (postId, userId, success) => {
  dispatchStartLoading();
  await fetch(`/api/posts/delete/${postId}/${userId}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchSuccess("Post deleted Successfully");
      success();
    });
};
