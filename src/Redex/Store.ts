import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./All Tables slice/user"; // Import the default export from the user slice

export const store = configureStore({
  reducer: {
    Allusers: userReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
