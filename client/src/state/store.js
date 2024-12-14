import { configureStore, combineReducers } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./theme/themeSlice";
import notificationReducer from "./notifications/notificationSlice";

const rootReducer = combineReducers({
  user: useReducer,
  theme: themeReducer,
  notification: notificationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {},
    }),
});

export const persistor = persistStore(store);
