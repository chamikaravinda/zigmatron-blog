import {
  loadingStart,
  loadingStop,
  errorNotification,
  successNotification,
  clearNotification,
} from "../state/notifications/notificationSlice";
import { store } from "../state/store";

export const dispatchError = (error) => {
  return store.dispatch(errorNotification(error));
};

export const dispatchSuccess = (message) => {
  return store.dispatch(successNotification(message));
};

export const dispatchStartLoading = () => {
  return store.dispatch(loadingStart());
};

export const dispatchStopLoading = () => {
  return store.dispatch(loadingStop());
};

export const dispatchClearNotifications = () => {
  return store.dispatch(clearNotification());
};