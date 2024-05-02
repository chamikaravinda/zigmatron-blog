import { signInSuccess } from "../state/user/userSlice";
import { store } from "../state/store";
import {
  dispatchError,
  dispatchStopLoading,
  dispatchStartLoading,
} from "./notifications.action";

export const userSingIn = (formData, success) => {
  dispatchStartLoading();
  fetch("api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.success) {
        dispatchError(payload.message);
        return;
      }
      store.dispatch(signInSuccess(payload.data));
      dispatchStopLoading();
      success();
    })
    .catch(() => {
      dispatchError("Unexpected error occurred while user sign in");
    });
};

export const userSingUp = (formData, success) => {
  dispatchStartLoading();
  fetch("api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        dispatchError(data.message);
        return;
      }
      dispatchStopLoading();
      success();
    })
    .catch(() => {
      dispatchError("Unexpected error occurred while user sign up");
    });
};
