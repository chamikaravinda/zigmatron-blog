import {
  dispatchError,
  dispatchStopLoading,
  dispatchStartLoading,
  dispatchSuccess,
} from "./notifications.action";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateSuccess,
  deleteUserSuccess,
  signOutSuccess,
} from "../state/user/userSlice";
import { store } from "../state/store";

export const uploadProfilePicture = async (
  imageFile,
  inProgress,
  failure,
  success
) => {
  dispatchStartLoading();
  const storage = getStorage(app);
  const fileName = new Date().getTime + imageFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 || 0;
      inProgress(progress);
    },
    () => {
      dispatchError("Could not upload image: File must be less than 2MB");
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

export const updateProfile = async (formData, currentUser) => {
  dispatchStartLoading(null);
  fetch(`/api/user/update/${currentUser._id}`, {
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
      store.dispatch(updateSuccess(payload.data));
      dispatchSuccess("User profile updated Successfully");
    })
    .catch((error) => {
      dispatchError(error.message);
    });
};

export const deleteUser = async (userId) => {
  dispatchStartLoading(null);
  fetch(`/api/user/delete/${userId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchStopLoading();
      store.dispatch(deleteUserSuccess());
    })
    .catch((error) => {
      dispatchError(error.message);
    });
};

export const signOut = async () => {
  dispatchStartLoading(null);
  fetch("/api/user/signout", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      dispatchStopLoading(null);
      store.dispatch(signOutSuccess());
    })
    .catch((error) => {
      dispatchError(error.message);
    });
};
