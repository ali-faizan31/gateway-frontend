import { createStore } from "redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from "./rootReducer";

// ----------------------------------------------------------------------
 
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
  });

export default store;
