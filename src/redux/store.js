import { configureStore } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }).concat(),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

export const persistor = persistStore(store);

export default store;
