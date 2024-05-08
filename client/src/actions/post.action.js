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
    dispatchError("Please select and Image");
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
    (error) => {
      dispatchError(error);
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


export const updatePost = async (formData,currentUserId, success) => {
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