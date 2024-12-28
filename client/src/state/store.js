import { configureStore, combineReducers } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./theme/themeSlice";
import notificationReducer from "./notifications/notificationSlice";
import path from "path";
import fs from "fs";
import process from "process";

const rootReducer = combineReducers({
  user: useReducer,
  theme: themeReducer,
  notification: notificationReducer,
});

let storageDir;

if (typeof window === "undefined") {
  storageDir = path.resolve("./server-storage");
}

if (typeof window === "undefined" && !fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

// Storage configuration
let storageConfig;

if (!process.env.SSR) {
  // Use browser's localStorage for csr
  storageConfig = storage;
} else {
  // Dynamically import node storage for SSR
  const { default: nodeStorage } = await import("redux-persist-node-storage");
  storageConfig = nodeStorage(storageDir);
}

const persistConfig = {
  key: "root",
  storage: storageConfig,
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
